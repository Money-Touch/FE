import { useState } from "react";
import AgreeData from "../../../utils/auth/signup/agreeData";
import type { AgreeItem } from "../../../types/auth/signup/agree";

export const useAgreeForm = () => {
    const [agreeList, setAgreeList] = useState<AgreeItem[]>(
        AgreeData.map(item => ({ ...item, checked: false }))
    );

    const allChecked = agreeList.every(item => item.checked);

    const requiredChecked = agreeList.filter(item => item.name.includes("(필수)")).every(item => item.checked);

    const toggleAll = () => {
        setAgreeList(prev => prev.map(item => ({ ...item, checked: !allChecked })));
    };

    const toggleItem = (id: number) => {
        setAgreeList(prev =>
            prev.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    return {
        agreeList,
        allChecked,
        requiredChecked,
        toggleAll,
        toggleItem,
    };
};
