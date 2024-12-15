import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return request.get(`/product/${id}/`).then((res) => res.data);
    },
  });
};
