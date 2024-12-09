import {
  NotificationOutlined,
  UserOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

interface MenuItem {
  id: number;
  label: string;
  icon: React.ComponentType;
  path: string;
}

export const data: MenuItem[] = [
  {
    id: 1,
    label: "Category List",
    icon: NotificationOutlined,
    path: "/app/category-list",
  },
  {
    id: 2,
    label: "Sub Category List",
    icon: UserOutlined,
    path: "/app/sub-category-list",
  },
  {
    id: 3,
    label: "Banner",
    icon: BranchesOutlined,
    path: "/app/banner",
  },
];
