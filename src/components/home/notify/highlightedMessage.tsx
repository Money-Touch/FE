import * as S from '../../../styles/home/notify.style';

type Props = {
  message: string;
  type: string;
  senderName?: string | null;
  hasThumbnail: (type: string) => boolean;
};

const HighlightedMessage = ({
  message,
  type,
  senderName,
  hasThumbnail,
}: Props) => {
  if (!hasThumbnail(type) || !senderName) {
    return <>{message}</>;
  }

  const name = type === 'COMMENT' ? `${senderName}_님 ` : `${senderName}_님`;

  return (
    <>
      <span className={S.SenderName}>{name}</span>
      {message}
    </>
  );
};

export default HighlightedMessage;
