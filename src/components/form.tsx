import { Form, Input, Upload, Button, Row, Col, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { initalValuesType } from "../pages/edit-category/edit-category";
import { UploadFile } from "antd/es/upload/interface";

interface CreateFormProps {
  createSubmit: (data: any) => void;
  form: any;
  isEdit?: boolean;
  initalValues?: initalValuesType;
}

const CreateForm: React.FC<CreateFormProps> = ({
  createSubmit,
  form,
  isEdit,
  initalValues,
}) => {
  const formProps = isEdit ? initalValues : {};
  console.log(formProps, "formProps");

  const defaultFileList: UploadFile[] =
    isEdit && initalValues?.image
      ? [
          {
            uid: "-1",
            name: `${initalValues.title}`,
            status: "done",
            url: `${initalValues.image}`,
          },
        ]
      : [];

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
        form={form}
        initialValues={formProps}
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
            <Form.Item label="Image" name="image">
              <Upload
                listType="picture"
                defaultFileList={defaultFileList}
                beforeUpload={() => false}
                accept="image/*"
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

export default CreateForm;
