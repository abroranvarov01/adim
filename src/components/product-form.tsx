import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetSubCategory } from "../pages/sub-category/service/query/useGetSubCategory";
import { Product } from "../pages/product/service/query/produc-types";

interface ProductFormProps {
  onFinish: (values: any) => void;
  initialValues?: Product;
  isEdit?: boolean;
}

const { Option } = Select;

const ProductForm: React.FC<ProductFormProps> = ({
  onFinish,
  initialValues,
  isEdit,
}) => {
  const formProps = isEdit ? { ...initialValues } : {};
  const { data: subCategories } = useGetSubCategory();
  const defaultFileList: UploadFile[] =
    isEdit && initialValues?.image
      ? [
          {
            uid: "-1",
            name: `${initialValues.title}`,
            status: "done",
            url: `${initialValues.image}`,
          },
        ]
      : [];

  // Default values for Switch components
  const initialFormValues = {
    is_available: initialValues?.is_available ?? false,
    is_new: initialValues?.is_new ?? false,
    ...formProps,
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialFormValues}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a category">
            {subCategories?.results.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the product name!" },
          ]}
        >
          <Input type="text" placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please enter the product price!" },
          ]}
        >
          <Input type="number" placeholder="Enter price" />
        </Form.Item>
        <Space>
          <Form.Item
            label="Available"
            name="is_available"
            valuePropName="checked"
          >
            <Switch defaultChecked={initialFormValues.is_available} />
          </Form.Item>
          <Form.Item label="New Product" name="is_new" valuePropName="checked">
            <Switch defaultChecked={initialFormValues.is_new} />
          </Form.Item>
        </Space>
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
        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
