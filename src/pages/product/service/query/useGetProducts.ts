import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => {
      return request.get("/product/").then((res) => res.data);
    },
  });
};
