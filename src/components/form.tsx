import { Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const InputForm = () => {
  return (
    <Form>
      <Form.Item name="title" label="Title">
        <Input type="text" />
      </Form.Item>
      <Form.Item name="image" label="Image">
        <Upload listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default InputForm;
