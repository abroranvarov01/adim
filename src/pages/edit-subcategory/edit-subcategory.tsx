import { message, Tabs } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleCategory } from "../edit-category/service/query/useGetSingleCategory";
import SubCategoryForm from "../../components/sub-category-form";
import { Form } from "antd";
import { RcFile } from "antd/es/upload";
import { useEditCategory } from "../edit-category/service/mutation/useEditCategory";
import React from "react";
import AtributeForm from "../../components/atribute-form";
import { Value } from "../create-sub-category/create-subcategory";
import { useEditAtribute } from "./service/useEditAtribute";
import { useNavigate } from "react-router-dom";
type ArtibuteFormType = {
  id: number;
  title: string;
  values: Value[];
};

export interface AttributeValuesType {
  title?: string;
  values?: {
    value?: string;
    value_id?: number;
  }[];
  category_id?: number;
  attribute_id?: number;
  attributes?: string[] | any;
}
export interface AttributeValuesType2 {
  title?: string;
  values?: {
    value?: string;
    value_id?: number;
  }[];
  category_id?: number;
  attribute_id?: number;
  attr_list?: string[] | any;
}
export type initalSubValuesType = {
  title: string;
  image: { file: File };
  category: string;
};

const EditSubcategory = () => {
  const { mutate: editAtributeMutate } = useEditAtribute();
  const [activeKey, setActiveKey] = React.useState<string>("1");
  const navigate = useNavigate();
  const { id: SubId } = useParams();
  const { data: SingleSubCategory, isLoading } = useGetSingleCategory(
    Number(SubId)
  );
  const [form] = Form.useForm();
  const { mutate: categoryEditMutate } = useEditCategory(Number(SubId));

  console.log(SingleSubCategory, "SingleSubCategory");

  const initialValues: initalSubValuesType = {
    title: SingleSubCategory?.title,
    image: SingleSubCategory?.image,
    category: SingleSubCategory?.parent?.title,
  };

  const AttributeId = SingleSubCategory?.attributes?.map(
    (item: any) => item.id
  );
  const valueId = SingleSubCategory?.attributes?.map((item: any) =>
    item.values.map((subItem: any) => subItem.id)
  );

  const AtributeInitialValues = {
    attr_list:
      SingleSubCategory?.attributes?.map((item: ArtibuteFormType) => ({
        title: item.title,
        values: item.values.map((value) => ({ value: value.value })),
      })) ?? [],
  };

  const handleEditSubCategory = (value: {
    title: string;
    image: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("title", value.title);
    if (value.image.file) {
      formData.append("image", value.image.file);
    }
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
  const handleEditAtribute = (values: AttributeValuesType2) => {
    console.log(values, "values");
    const processedAttributes =
      values?.attr_list?.map((item: AttributeValuesType2, index: number) => ({
        attribute_id: AttributeId[index] ?? null,
        title: item.title,
        values:
          item.values?.map((subItem, subIndex) => ({
            value: subItem.value,
            value_id: valueId[index]?.[subIndex] ?? null,
          })) ?? [],
      })) ?? [];
    editAtributeMutate(
      { attributes: processedAttributes, category_id: Number(SubId) },
      {
        onSuccess: () => {
          message.success("Attributes updated successfully!");
          navigate("/app/sub-category-list");
        },
        onError: (err) => {
          message.error("Failed to update attributes!");
          console.error("Error:", err);
        },
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={(key) => setActiveKey(key)}
        activeKey={activeKey}
        items={[
          {
            label: "Edit Sub Category",
            key: "1",
            children: (
              <SubCategoryForm
                isEdit={true}
                initialValues={initialValues}
                createSubmit={handleEditSubCategory}
                form={form}
              />
            ),
          },
          {
            label: "Edit Attributes",
            key: "2",
            children: (
              <AtributeForm
                initialValues={AtributeInitialValues}
                onFininsh={handleEditAtribute}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default EditSubcategory;
