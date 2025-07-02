import { useMutation } from "@tanstack/react-query";
import { API } from "../../../apis/axios";

export const useProfileMutation = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await API.post("/users", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        },

        onSuccess: (data) => {
            console.log("저장 성공: ", data);
        },

        onError: (error) => {
            console.error("저장 실패: ", error);
        },
    });
};
