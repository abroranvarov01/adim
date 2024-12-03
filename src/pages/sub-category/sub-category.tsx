import { useGetSubCategory } from "./service/query/useGetSubCategory";
import { useNavigate } from "react-router-dom";
import { Button, Image, Table } from "antd";
import { useDeleteCategory } from "../category-list/service/mutation/useDeleteCategory";
interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: any) => JSX.Element;
}

const SubCategoryList = () => {
  const { data: SubCategorydata } = useGetSubCategory();
  const { mutate: deleteSubCategoryMutate } = useDeleteCategory();
  const handleDelete = (id: number) => {
    console.log(id, "id");

    deleteSubCategoryMutate(id);
  }; //Delete
  console.log(SubCategorydata, "Subdata");
  const navigate = useNavigate();
  const dataSource =
    SubCategorydata?.results.map((item) => {
      return {
        key: item.id,
        id: item.id,
        img: item.image,
        title: item.title,
        parent: item.parent.title,
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
            onClick={() => navigate(`/app/edit-category/${record.id}`)}
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
  return (
    <div>
      <div>
        <Table columns={columns} dataSource={dataSource} rowKey="id" />
      </div>
    </div>
  );
};

export default SubCategoryList;
