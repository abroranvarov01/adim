import { useMutation } from "@tanstack/react-query";
import request from "../../../config/request";
import { AttributeValuesType } from "../edit-subcategory";

export const useEditAtribute = () => {
  return useMutation({
    mutationFn: (data: AttributeValuesType) =>
      request.patch(`/api/category_edit/`, data).then((res) => res.data),
  });
};
