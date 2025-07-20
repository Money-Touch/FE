import * as S from '../../../styles/home/record.style';
import camera from '../../../assets/images/home/record/camera.png';

interface ImageUploaderProps {
  imageUrl: string;
  isDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ imageUrl, isDisabled, onChange }: ImageUploaderProps) => {
  return (
    <S.ImageInputWrapper $disabled={isDisabled}>
      <S.ImageLabel htmlFor="imageUpload">
        {imageUrl ? (
          <S.ImagePreview src={imageUrl} alt="preview" />
        ) : (
          <S.CameraIcon src={camera} alt="camera icon" />
        )}
      </S.ImageLabel>
      <S.ImageInput
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </S.ImageInputWrapper>
  );
};

export default ImageInput;
