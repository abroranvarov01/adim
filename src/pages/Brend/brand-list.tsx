import { Button, Image } from "antd";
import Table, { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useGetBrand } from "./service/query/useGetBrand";
import { useDeleteBrand } from "./service/mutation/useDeleteBrand";
const BrandList = () => {
  const { mutate: deleteBrand } = useDeleteBrand();
  const { data: BrandData } = useGetBrand();
  const navigate = useNavigate();
  const dataSource =
    BrandData?.results.map((item) => {
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
          <Button type="primary" onClick={() => deleteBrand(record.id)}>
            Delete
          </Button>
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
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};

export default BrandList;
