import request from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetAtributes = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: () => {
      return request.get("/attribute/").then((res) => res.data);
    },
  });
};
