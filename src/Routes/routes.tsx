import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/main-layout";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import { CategoryList } from "../pages/category-list/category-list";
import SubCategoryList from "../pages/sub-category/sub-category";
import CreateCategory from "../pages/create-category/create-category";
import EditCategory from "../pages/edit-category/edit-category";
import CreateSubCategory from "../pages/create-sub-category/create-subcategory";
import EditSubcategory from "../pages/edit-subcategory/edit-subcategory";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="sub-category-list" element={<SubCategoryList />} />
        <Route path="edit-category/:id" element={<EditCategory />} />
        <Route path="sub-category-create" element={<CreateSubCategory />} />
        <Route path="sub-category-edit/:id" element={<EditSubcategory />} />
      </Route>
    </Routes>
  );
};

export default Router;
