import { useRef, useState } from "react";
import ProfileIcon from "../../../assets/images/auth/signup/profileIcon.png";

export const useProfileImage = () => {
    const [preview, setPreview] = useState<string>(ProfileIcon);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImgClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };

    return {
        preview,
        fileInputRef,
        handleImgClick,
        handleChange,
    };
};
