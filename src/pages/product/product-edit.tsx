import React from "react";
import { useParams } from "react-router-dom";
import { useEditProduct } from "./service/mutation/useEditProducts";
import { useGetSingleProduct } from "./service/query/useGetSingleProduct";
import ProductForm from "../../components/product-form";
import { Product } from "./service/query/produc-types";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { RcFile } from "antd/es/upload";
const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: editProduct } = useEditProduct(Number(id));
  const { data: singleProduct, isLoading } = useGetSingleProduct(Number(id));
  const ProductEdit = (values: {
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
    const isAvailableStr = values.is_available ? "true" : "false";
    const isNewStr = values.is_new ? "true" : "false";
    formData.append("is_available", isAvailableStr);
    formData.append("is_new", isNewStr);
    if (values.image.file) {
      formData.append("image", values.image.file);
    }
    editProduct(formData, {
      onSuccess: () => {
        message.success("Product added successfully");
        navigate("/app/product-list");
      },
      onError: (error: any) => {
        message.error(error.message);
      },
    });
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ProductForm
        initialValues={singleProduct}
        isEdit={true}
        onFinish={ProductEdit}
      />
    </div>
  );
};

export default ProductEdit;
