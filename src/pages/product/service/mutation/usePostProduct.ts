import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useProductCreate = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/product/", data).then((res) => res.data),
  });
};
