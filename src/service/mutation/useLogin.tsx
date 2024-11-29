import request from "../../config/request";
import { useMutation } from "@tanstack/react-query";
import { LoginType } from "../../service/mutation/login-type";
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginType) => {
      return request.post("/api/admin-login/", data);
    },
  });
};
