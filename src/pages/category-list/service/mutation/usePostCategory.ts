import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import client from "../../../../config/query-client";
export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.post("/category/", data).then((res) => res.data.data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
