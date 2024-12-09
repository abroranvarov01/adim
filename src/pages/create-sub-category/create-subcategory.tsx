import { message, Tabs } from "antd";
import React from "react";
import SubCategoryForm from "../../components/sub-category-form";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { usePostCategory } from "../category-list/service/mutation/usePostCategory";
import AtributeForm from "../../components/atribute-form";
import { usePostAribute } from "./service/mutation/usePostAribute";
import { useGetAtributes } from "./service/query/useGetAtributes";
import { useNavigate } from "react-router-dom";
export interface attr_listType {
  category: number[];
  title: string;
  values: string[];
}

export interface Value {
  value: string;
}

export interface Attribute {
  title: string;
  values: Value[];
}

export interface FormValues {
  attr_list: Attribute[];
}

const CreateSubCategory: React.FC = () => {
  const { mutate: SubcategoryMutate, data: SubData } = usePostCategory();
  const [activeKey, setActiveKey] = React.useState<string>("1");
  const { mutate: AtributeMutate } = usePostAribute();
  const [form] = useForm();
  const { data: Atributes } = useGetAtributes();
  const navigate = useNavigate();
  const AddsubCategory = (data: {
    title: string;
    image: { file: RcFile };
    parent: string;
  }) => {
    const formData = new FormData();

    formData.append("title", data?.title);
    if (data.image) {
      formData.append("image", data.image.file);
    }
    formData.append("parent", data?.parent);
    console.log(data, "data");
    SubcategoryMutate(formData, {
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

  const SubmitAtribute = (data: FormValues) => {
    console.log(data, "Asssssssdata");

    const attr_list: attr_listType[] = data.attr_list.map((item) => ({
      category: [SubData?.id],
      title: item.title,
      values: item.values.map((value) => value.value),
    }));
    console.log({ attr_list }, "dataAsil");

    AtributeMutate(
      { attr_list },
      {
        onSuccess: () => {
          message.success("Attributes added successfully");
          form.resetFields();
          navigate("/app/sub-category-list");
        },
        onError: (error: any) => {
          message.error(`Failed to add attributes: ${error.message}`);
        },
      }
    );
  };
  console.log(Atributes, "Atributes");

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
              <SubCategoryForm
                isEdit={false}
                createSubmit={AddsubCategory}
                form={form}
              />
            ),
          },
          {
            label: "Sub Category",
            key: "2",
            children: (
              <AtributeForm isEdit={false} onFininsh={SubmitAtribute} />
            ),
          },
        ]}
      />
    </div>
  );
};

export default CreateSubCategory;
