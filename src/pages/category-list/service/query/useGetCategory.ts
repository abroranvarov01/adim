import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { Response } from "./category-types";
const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => {
      return request.get<Response>("/category/").then((res) => res.data);
    },
  });
};
export default useGetCategory;
