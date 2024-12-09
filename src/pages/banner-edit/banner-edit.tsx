import { message, Typography } from "antd";
import { useParams } from "react-router-dom";
import BannerForm from "../../components/banner-form";
import { useGetSingleBanner } from "../create-banner/service/query/useGetSingleBanner";
import { BannerFormType } from "../create-banner/create-banne";
import { useEditBanner } from "../category-list/service/mutation/useEditBanner";
import { useNavigate } from "react-router-dom";
const BannerEdit = () => {
  const navigate = useNavigate();
  const { id: bannerId } = useParams<{ id: string }>();
  const { data: singleBanner, isLoading } = useGetSingleBanner(
    Number(bannerId)
  );
  const { mutate: bannerMutate } = useEditBanner(Number(bannerId));
  const initialValues = {
    title: singleBanner?.title,
    description: singleBanner?.description,
    image: singleBanner?.image,
  };
  if (isLoading) return <div>Loading...</div>;
  const BannerEdit = (data: BannerFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image.file) {
      formData.append("image", data.image.file);
    }
    bannerMutate(formData, {
      onSuccess: () => {
        message.success("Banner added successfully");
        window.location.href = "/app/banner";
      },
      onError: (error: any) => {
        message.error(`Failed to add banner: ${error.message}`);
      },
    });
  };
  return (
    <div>
      <Typography.Title>Edit Banner</Typography.Title>
      <BannerForm
        isEdit={true}
        initalValues={initialValues}
        createSubmit={BannerEdit}
      />
    </div>
  );
};

export default BannerEdit;
