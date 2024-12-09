import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";
export const useEditBanner = (id: number) => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.patch(`/banner/${id}/`, data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [`banner`] });
    },
  });
};
