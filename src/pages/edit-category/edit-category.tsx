import React from "react";
import { useParams } from "react-router-dom";
import CreateForm from "../../components/form";
import { useForm } from "antd/es/form/Form";
import { useGetSingleCategory } from "./service/query/useGetSingleCategory";
import { Button, message, Table, Tabs } from "antd";
import { useEditCategory } from "./service/mutation/useEditCategory";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { ColumnType } from "antd/es/table";
export type initalValuesType = { title: string; image: { file: File } };
import { useDeleteCategory } from "../category-list/service/mutation/useDeleteCategory";
const EditCategory = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { id } = useParams();
  const [activeKey, setActiveKey] = React.useState<string>("1");
  const { mutate: deleteSubCategory } = useDeleteCategory();
  const { data: singleCategory, isLoading } = useGetSingleCategory(Number(id));
  const { mutate: categoryEditMutate } = useEditCategory(Number(id));
  const initalValues: initalValuesType = {
    title: singleCategory?.title,
    image: singleCategory?.image,
  };
  const handleCategoryChange = (value: {
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
  const handleDelete = (id: number) => {
    deleteSubCategory(id, {
      onSuccess: () => {
        message.success("Category deleted successfully");
      },
      onError: (error: any) => {
        message.error(`Failed to delete category: ${error.message}`);
      },
    });
  };
  const dataSource =
    singleCategory?.children.map((item: any) => {
      return {
        key: item.id,
        id: item.id,
        img: item.image,
        title: item.title,
        parent: singleCategory.title,
      };
    }) || [];
  const columns: ColumnType[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
    },
    {
      title: "IMG",
      dataIndex: "img",
      key: "img",
      render: (image) => <Image src={image} width={50} height={50} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => navigate(`/app/sub-category-edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            color="danger"
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <Tabs
        onChange={(key) => setActiveKey(key)}
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
            children: <Table columns={columns} dataSource={dataSource} />,
          },
        ]}
      />
    </div>
  );
};

export default EditCategory;
