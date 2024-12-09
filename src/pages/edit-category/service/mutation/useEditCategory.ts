import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";
export const useEditCategory = (id: number) => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.put(`/category/${id}/`, data).then((res) => res.data.data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
