import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { BrandGet } from "../mutation/brand-types";

export const useGetSingleBrand = (id: number) => {
  return useQuery({
    queryKey: ["singleBrand", id],
    queryFn: () => {
      return request.get(`brand/${id}/`).then((res) => res.data);
    },
  });
};
