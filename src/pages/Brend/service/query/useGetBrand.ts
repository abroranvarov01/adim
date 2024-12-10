import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { BrandResponse } from "../mutation/brand-types";

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => {
      return request.get<BrandResponse>("/brand/").then((res) => res.data);
    },
  });
};
