import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";
import client from "../../../../config/query-client";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product/${id}/`).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
