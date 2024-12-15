import { Button, Image, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useGetProducts } from "./service/query/useGetProducts";
import { useDeleteProduct } from "./service/mutation/useDeleteProduct";
const ProductList = () => {
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: ProductData } = useGetProducts();
  const navigate = useNavigate();
  console.log(ProductData, "ProductData");

  const dataSource =
    ProductData?.results.map((item) => {
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
            onClick={() => navigate(`/app/edit-product/${record.id}`)}
            type="primary"
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              deleteProduct(record.id);
            }}
          >
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
          navigate("/app/create-product");
        }}
        style={{ marginBottom: "20px" }}
        type="primary"
      >
        Create Product
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductList;
