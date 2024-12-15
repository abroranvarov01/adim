import { message } from "antd";
import ProductForm from "../../components/product-form";
import { useProductCreate } from "./service/mutation/usePostProduct";
import { useNavigate } from "react-router-dom";
import { RcFile } from "antd/es/upload";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { mutate: productMutate } = useProductCreate();

  const ProductCreate = (values: {
    title: string;
    price: string;
    image: { file: RcFile };
    category: string;
    is_available?: boolean | undefined;
    is_new?: boolean | undefined;
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("category", values.category);

    // Преобразуем значения boolean в строки
    const isAvailableStr = values.is_available ? "true" : "false";
    const isNewStr = values.is_new ? "true" : "false";

    formData.append("is_available", isAvailableStr);
    formData.append("is_new", isNewStr);

    if (values.image.file) {
      formData.append("image", values.image.file);
    }

    productMutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/product-list");
      },
      onError: (error: any) => {
        message.error(`Failed to add product: ${error.message}`);
      },
    });
  };

  return (
    <div>
      <ProductForm onFinish={ProductCreate} />
    </div>
  );
};

export default CreateProduct;
