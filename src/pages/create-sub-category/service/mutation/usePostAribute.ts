import request from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { attr_listType } from "../../create-subcategory";

export const usePostAribute = () => {
  return useMutation({
    mutationFn: (data: { attr_list: attr_listType[] }) => {
      return request.post("/attribute/", data).then((res) => res.data);
    },
  });
};
