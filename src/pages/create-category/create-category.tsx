import React from "react";
import { message, Tabs } from "antd";
import CreateForm from "../../components/form";
import { usePostCategory } from "../category-list/service/mutation/usePostCategory";
import { RcFile } from "antd/es/upload";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
const CreateCategory: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: categoryMutate, data: CategoryData } = usePostCategory();
  const [activeKey, setActiveKey] = React.useState<string>("1");
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };
  const [form] = useForm();
  const createSubmit = (data: { title: string; image: { file: RcFile } }) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    if (data.image) {
      formData.append("image", data.image.file);
    }

    categoryMutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully");
        form.resetFields();
        handleTabChange("2");
      },
      onError: (error: any) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };
  const subSubmit = async (data: {
    title: string;
    image: { file: RcFile };
    parent: string;
  }) => {
    const formData = new FormData();

    data.parent = await CategoryData?.id;
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image.file);
    }
    formData.append("parent", data.parent);
    categoryMutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully");
        form.resetFields();
        navigate("/app/category-list");
      },
      onError: (error: any) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };
  return (
    <div>
      <Tabs
        activeKey={activeKey}
        defaultActiveKey="1"
        items={[
          {
            label: "Create",
            key: "1",
            children: (
              <CreateForm
                isEdit={false}
                createSubmit={createSubmit}
                form={form}
              />
            ),
          },
          {
            label: "Sub Category",
            disabled: !CategoryData?.id,
            key: "2",
            children: (
              <CreateForm isEdit={false} createSubmit={subSubmit} form={form} />
            ),
          },
        ]}
      />
    </div>
  );
};

export default CreateCategory;
