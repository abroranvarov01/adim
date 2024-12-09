import { Button, Card, Col, Form, Input, Row, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
interface CreateFormProps {
  createSubmit: (data: any) => void;
  isEdit?: boolean;
  initalValues?: any;
}

const BannerForm: React.FC<CreateFormProps> = ({
  isEdit,
  createSubmit,
  initalValues,
}) => {
  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      name: `${initalValues?.title}`,
      status: "done",
      url: `${initalValues?.image}`,
    },
  ];
  const formProps = isEdit ? { ...initalValues } : {};
  return (
    <Card
      title="Create Category"
      bordered={false}
      style={{
        width: "100%",
        margin: "20px auto",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Form
        initialValues={{ ...formProps }}
        onFinish={createSubmit}
        layout="vertical"
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input
                type="text"
                placeholder="Enter category title"
                style={{ borderRadius: "5px", maxWidth: "600px" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea
                placeholder="Enter category description"
                style={{ borderRadius: "5px", maxWidth: "600px" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"img"} name={"image"} valuePropName="file">
              <Upload
                listType="picture"
                defaultFileList={isEdit ? defaultFileList : []}
                beforeUpload={() => false}
                accept="image"
                maxCount={1}
              >
                <Button type="primary" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontWeight: "bold", maxWidth: "600px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default BannerForm;
