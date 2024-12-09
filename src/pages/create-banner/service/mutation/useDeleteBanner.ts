import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";

export const useDeleteBanner = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return request.delete(`/banner/${id}/`).then((res) => res.data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [`banner`] });
    },
  });
};
