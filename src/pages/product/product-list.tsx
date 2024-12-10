import { Button, Image, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  // const dataSource =
  //   BrandData?.results.map((item) => {
  //     return {
  //       key: item.id,
  //       id: item.id,
  //       img: item.image,
  //       title: item.title,
  //     };
  //   }) || [];
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
      render: (image) => <Image src={image} width={100} height={100} />,
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
            onClick={() => navigate(`/app/edit-brand/${record.id}`)}
            type="primary"
          >
            Edit
          </Button>
          <Button type="primary" onClick={() => {}}>
            Delete
          </Button>
          <Button type="primary">Variants</Button>
          <Button type="primary">Category</Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Button
        onClick={() => {
          navigate("/app/create-brand");
        }}
        style={{ marginBottom: "20px" }}
        type="primary"
      >
        Create Brand
      </Button>
      <Table  columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductList;
