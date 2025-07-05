import type { QnaItem } from "../../../types/auth/test/qna";

export const getQnaResult = (answers: Record<number, QnaItem>) => {
    const counts = { PS: 0, TF: 0, GE: 0 };

    Object.values(answers).forEach(({ type, choiceIndex }) => {
        const key = type as keyof typeof counts;
        if (choiceIndex === 1) counts[key]++;
    });

    const psType = counts.PS >= 2 ? "S" : "P";
    const tfType = counts.TF >= 2 ? "F" : "T";
    const geType = counts.GE >= 2 ? "E" : "G";

    return `${psType}${tfType}${geType}`;
};
