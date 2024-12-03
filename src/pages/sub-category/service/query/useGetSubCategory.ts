import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { SubResponse } from "./SubCategory-types";

export const useGetSubCategory = () => {
  return useQuery({
    queryKey: ["sub-category"],
    queryFn: () => {
      return request
        .get<SubResponse>("/api/subcategory/")
        .then((res) => res.data);
    },
  });
};
