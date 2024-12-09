import { Button, Image, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useGetBanner } from "../create-banner/service/query/useGetBanner";
import { useDeleteBanner } from "../create-banner/service/mutation/useDeleteBanner";
const Banner = () => {
  const { data: BannerData } = useGetBanner();
  const navigate = useNavigate();
  console.log(BannerData, "BannerData");
  const { mutate: deleteBannerMutate } = useDeleteBanner();
  const dataSource =
    BannerData?.results.map((item) => {
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
            onClick={() => navigate(`/app/edit-banner/${record.id}`)}
            type="primary"
          >
            Edit
          </Button>
          <Button type="primary" onClick={() => deleteBannerMutate(record.id)}>
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
          navigate("/app/create-banner");
        }}
        style={{ marginBottom: "20px" }}
        type="primary"
      >
        Add Banner
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
};

export default Banner;
