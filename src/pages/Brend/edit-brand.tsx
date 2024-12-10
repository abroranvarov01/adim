import { message, Typography } from "antd";
import { useGetSingleBrand } from "./service/query/useGetSingleBrand";
import CreateForm from "../../components/form";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import { initalValuesType } from "../edit-category/edit-category";
import { useEditBrand } from "./service/mutation/useEditBrand";
import { useNavigate } from "react-router-dom";
const EditBrand = () => {
  const navigate = useNavigate();
  const { id: brandId } = useParams();
  const { data: singleBrand } = useGetSingleBrand(Number(brandId));
  console.log(singleBrand, "singleBrand");
  const initalValues: initalValuesType = {
    title: singleBrand?.title,
    image: singleBrand?.image,
  };

  const { mutate: brandEditMutate } = useEditBrand(Number(brandId));
  const [form] = Form.useForm();
  const EditBrand = (data: { title: string; image: { file: File } }) => {
    const formData = new FormData();

    formData.append("title", data?.title);
    if (data.image.file) {
      formData.append("image", data.image.file);
    }

    brandEditMutate(formData, {
      onSuccess: () => {
        message.success("Brand edited successfully");
        form.resetFields();
        navigate("/app/brand-list");
      },
      onError: (error: any) => {
        message.error(`Failed to edit brand: ${error.message}`);
      },
    });
  };
  return (
    <div>
      <Typography.Title>Edit Brand</Typography.Title>
      <CreateForm
        form={form}
        isEdit={true}
        initalValues={initalValues}
        createSubmit={EditBrand}
      />
    </div>
  );
};

export default EditBrand;
