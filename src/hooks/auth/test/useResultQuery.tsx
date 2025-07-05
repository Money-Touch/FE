import { useQuery } from "@tanstack/react-query";
import { API } from "../../../apis/axios";
import type { ResultProps } from "../../../types/auth/test/result";

const fetchResult = async (): Promise<ResultProps> => {
    const res = await API.get("/users/1");
    const user = res.data;

    return {
        name: user.name,
        email: user.email,
        companyName: user.company.name,
    };
};

export const useResultQuery = () => {
    return useQuery<ResultProps>({
        queryKey: ["result"],
        queryFn: fetchResult,
    });
};
