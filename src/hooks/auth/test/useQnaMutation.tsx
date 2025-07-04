import { useMutation } from "@tanstack/react-query";
import { API } from "../../../apis/axios";

const sendQnaResult = async (resultCode: string): Promise<any> => {
  const response = await API.post("/users", { resultCode });
  return response.data;
};

export const useQnaMutation = () => {
  return useMutation<any, Error, string>({
    mutationFn: sendQnaResult,
  });
};
