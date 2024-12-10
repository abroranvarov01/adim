import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";

export const useEditBrand = (id: number) => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.patch(`/brand/${id}/`, data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [`brand`] });
      client.invalidateQueries({ queryKey: [`singleBrand`, id] });
    },
  });
};
