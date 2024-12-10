import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";
export const useDeleteBrand = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return request.delete(`/brand/${id}/`).then((res) => res.data.data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};
