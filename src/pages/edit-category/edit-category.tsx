import React from "react";
import { useParams } from "react-router-dom";
import CreateForm from "../../components/form";
import { useForm } from "antd/es/form/Form";
import { useGetSingleCategory } from "./service/query/useGetSingleCategory";
import { message, Tabs } from "antd";
import { useEditCategory } from "./service/mutation/useEditCategory";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
export type initalValuesType = { title: string; image: { file: File } };
const EditCategory = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { id } = useParams();
  const [activeKey, setActiveKey] = React.useState<string>("1");
  const { data: singleCategory, isLoading } = useGetSingleCategory(Number(id));
  const { mutate: categoryEditMutate } = useEditCategory(Number(id));
  const initalValues: initalValuesType = {
    title: singleCategory?.title,
    image: singleCategory?.image,
  };
  const handleCategoryChange = (data: {
    title: string;
    image: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image.file);
    }
    console.log(data, "datafn");

    categoryEditMutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully");
        form.resetFields();
        setActiveKey("2");
      },
      onError: (error: any) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        defaultActiveKey="1"
        items={[
          {
            label: "Edit Category",
            key: "1",
            children: (
              <CreateForm
                createSubmit={handleCategoryChange}
                initalValues={initalValues}
                isEdit={true}
                form={form}
              />
            ),
          },
          {
            label: " Edit Sub Category",
            key: "2",
            children: <div>Sub Category</div>,
          },
        ]}
      />
    </div>
  );
};

export default EditCategory;
