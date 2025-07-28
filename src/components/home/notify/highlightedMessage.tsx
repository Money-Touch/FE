import * as S from '../../../styles/home/notify.style';
import { mockUser } from '../../../mocks/home/mockUser'; // mock data

type Props = {
  message: string;
  type: string;
  senderId?: number;
  hasThumbnail: (type: string) => boolean;
};

const HighlightedMessage = ({
  message,
  type,
  senderId,
  hasThumbnail,
}: Props) => {
  if (!hasThumbnail(type) || !senderId) {
    return <>{message}</>;
  }

  const senderName =
    mockUser.find((user) => user.id === senderId)?.username + '_님';

  if (!senderName || !message.includes(senderName)) {
    return <>{message}</>;
  }

  const parts = message.split(senderName);

  return (
    <>
      {parts[0]}
      <span className={S.SenderName}>{senderName}</span>
      {parts[1]}
    </>
  );
};

export default HighlightedMessage;
