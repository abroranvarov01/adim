import CreateForm from "../../components/form";
import { Form, message } from "antd";
import { usePostBrand } from "./service/mutation/usePostBrand";
import { useNavigate } from "react-router-dom";
const CreateBrand = () => {
  const navigate = useNavigate();
  const { mutate: brandMutate } = usePostBrand();
  const [form] = Form.useForm();
  const createBrandSubmit = (data: {
    title: string;
    image: { file: File };
  }) => {
    const formData = new FormData();
    formData.append("title", data?.title);

    formData.append("image", data.image.file);

    brandMutate(formData, {
      onSuccess: () => {
        message.success("Brand added successfully");
        form.resetFields();
        navigate("/app/brand-list");
      },
      onError: (error: any) => {
        message.error(`Failed to add brand: ${error.message}`);
      },
    });
  };
  return (
    <div>
      <CreateForm createSubmit={createBrandSubmit} form={form} />
    </div>
  );
};

export default CreateBrand;
