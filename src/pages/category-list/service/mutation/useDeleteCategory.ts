import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return request.delete(`/category/${id}/`).then((res) => res.data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
