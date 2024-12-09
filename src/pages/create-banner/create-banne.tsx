import { message, Typography } from "antd";
import BannerForm from "../../components/banner-form";
import { usePostBanner } from "./service/mutation/usePostBanner";
import { useNavigate } from "react-router-dom";

export type BannerFormType = {
  title: string;
  description: string;
  image: { file: File };
};
const CreateBanner = () => {
  const navigate = useNavigate();
  const { mutate: bannerMutate } = usePostBanner();
  const handleCreateBanner = (data: BannerFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image.file);
    bannerMutate(formData, {
      onSuccess: () => {
        message.success("Banner added successfully");
        navigate("/app/banner");
      },
      onError: (error: any) => {
        message.error(`Failed to add banner: ${error.message}`);
      },
    });
  };
  return (
    <div>
      <Typography.Title>Create Banner</Typography.Title>
      <BannerForm
        isEdit={false}
        createSubmit={handleCreateBanner}
        initalValues={{}}
      />
    </div>
  );
};

export default CreateBanner;
