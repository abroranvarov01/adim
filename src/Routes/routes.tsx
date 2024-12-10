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
import Banner from "../pages/banner/banner";
import CreateBanner from "../pages/create-banner/create-banne";
import BannerEdit from "../pages/banner-edit/banner-edit";
import BrandList from "../pages/Brend/brand-list";
import CreateBrand from "../pages/Brend/create-brand";
import EditBrand from "../pages/Brend/edit-brand";
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
        <Route path="banner" element={<Banner />} />
        <Route path="create-banner" element={<CreateBanner />} />
        <Route path="edit-banner/:id" element={<BannerEdit />} />
        <Route path="brand-list" element={<BrandList />} />
        <Route path="create-brand" element={<CreateBrand />} />
        <Route path="edit-brand/:id" element={<EditBrand />} />
      </Route>
    </Routes>
  );
};

export default Router;
