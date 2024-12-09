import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { BannerResponse } from "./banner-type";

export const useGetBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => {
      return request.get<BannerResponse>("/banner/").then((res) => res.data);
    },
  });
};
