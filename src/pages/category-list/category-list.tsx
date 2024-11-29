import { Button, Table } from "antd";
import useGetCategory from "./service/query/useGetCategory";

interface columnType {
  title: string;
  dataIndex: string;
  key: string;
}

export const CategoryList = () => {
  const { data } = useGetCategory();
  const dataSource = data?.results.map((item) => {
    return {
      key: item.id,
      id: item.id,
      img: item.image,
      title: item.title,
    };
  });

  const columns: columnType[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "IMG",
      dataIndex: "img",
      key: "img",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
    },
  ];

  return (
    <div className="table-wrapper">
      <Button style={{ marginBottom: "10px" }} type="primary" variant="dashed">
        Create
      </Button>
      <div>
        <Table columns={columns} dataSource={dataSource} rowKey="id" />
      </div>
    </div>
  );
};
