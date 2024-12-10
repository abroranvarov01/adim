import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const usePostBrand = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.post("/brand/", data);
    },
  });
};
