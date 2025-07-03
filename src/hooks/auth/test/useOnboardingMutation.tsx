import { useMutation } from "@tanstack/react-query";
import { API } from "../../../apis/axios";

interface SubmitPayload {
    answers: { id: number; answer: string }[];
}

const submitOnboarding = async (payload: SubmitPayload) => {
    const response = await API.post("/users", payload);
    return response.data;
};

export const useOnboardingMutation = () => {
    return useMutation({ mutationFn: submitOnboarding });
};
