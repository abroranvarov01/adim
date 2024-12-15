import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";
export const useEditProduct = (id: number) => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.patch(`/product/${id}/`, data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
      client.invalidateQueries({ queryKey: ["singleProduct", id] });
    },
  });
};
