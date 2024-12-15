import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { ProductResponse } from "./produc-types";
export const useGetProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => {
      return request.get<ProductResponse>("/product/").then((res) => res.data);
    },
  });
};
