import {
  Button,
  Form,
  Input,
  message,
  Typography,
  Space,
  Row,
  Col,
  Card,
  Divider,
  Checkbox,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginType } from "../../service/mutation/login-type";
import { useLogin } from "../../service/mutation/useLogin";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const handleSubmit = (data: LoginType) => {
    mutate(data, {
      onSuccess: (res: AxiosResponse) => {
        message.success("Login successful");
        Cookies.set("token", res.data.token);
        navigate("/app"); // Navigate after successful login
      },
      onError: (error) => {
        message.error("Login failed");
        console.error("Error:", error);
      },
    });
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#ffffff",
      }}
    >
      <Col>
        <Card
          style={{
            width: 400,
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
            padding: "40px",
          }}
        >
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%", textAlign: "center" }}
          >
            <Title level={2} style={{ color: "#333333" }}>
              Welcome Back
            </Title>
            <Text type="secondary">Please log in to your account</Text>
            <Form
              onFinish={handleSubmit}
              style={{ maxWidth: "300px", margin: "0 auto" }}
              layout="vertical"
            >
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
                label="Phone Number"
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Phone Number"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                label="Password"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <Text type="secondary">
              Don't have an account? <Link href="/register">Register now!</Link>
            </Text>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
