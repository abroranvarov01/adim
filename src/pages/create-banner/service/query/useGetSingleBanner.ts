import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { Banner } from "./banner-type";
export const useGetSingleBanner = (id: number) => {
  return useQuery({
    queryKey: ["singleBanner", id],
    queryFn: () => {
      return request.get<Banner>(`banner/${id}/`).then((res) => res.data);
    },
  });
};
