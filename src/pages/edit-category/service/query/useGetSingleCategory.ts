import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetSingleCategory = (id: number) => {
  return useQuery({
    queryKey: ["singleCategory", id],
    queryFn: () => {
      return request.get(`/category/${id}/`).then((res) => res.data);
    },
  });
};
