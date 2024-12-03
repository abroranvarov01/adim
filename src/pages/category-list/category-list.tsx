import { Button, Image, Table } from "antd";
import useGetCategory from "./service/query/useGetCategory";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";
interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: any) => JSX.Element;
}

export const CategoryList = () => {
  const { data: Categorydata } = useGetCategory();
  const { mutate: deleteCategoryMutate } = useDeleteCategory();
  console.log(Categorydata, "Categorydata");
  const navigate = useNavigate();
  const handleDelete = (id: number) => {
    deleteCategoryMutate(id);
  };
  const dataSource =
    Categorydata?.results.map((item) => {
      return {
        key: item.id,
        id: item.id,
        img: item.image,
        title: item.title,
      };
    }) || [];

  const columns: ColumnType[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
          <Button type="primary" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="table-wrapper">
      <Button
        onClick={() => navigate("/app/create-category")}
        style={{ marginBottom: "10px" }}
        type="primary"
        variant="dashed"
      >
        Create
      </Button>
      <div>
        <Table columns={columns} dataSource={dataSource} rowKey="id" />
      </div>
    </div>
  );
};
