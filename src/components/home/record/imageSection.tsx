import * as S from '../../../styles/home/record.style';
import camera from '../../../assets/images/home/record/camera.png';
import Title from './title';

interface Props {
  imageUrl: string;
  isDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageSection = ({ imageUrl, isDisabled, onChange }: Props) => {
  return (
    <div className={S.ImageSection}>
      <Title showStar={isDisabled}>사진</Title>
      <div className={S.ImageInputWrapper(isDisabled)}>
        <label htmlFor="imageUpload" className={S.ImageLabel}>
          {imageUrl ? (
            <img src={imageUrl} alt="preview" className={S.ImagePreview} />
          ) : (
            <img src={camera} alt="camera icon" className={S.CameraIcon} />
          )}
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={onChange}
          className={S.ImageInput}
        />
      </div>
    </div>
  );
};

export default ImageSection;
