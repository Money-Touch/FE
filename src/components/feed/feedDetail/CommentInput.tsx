import React from 'react';
import * as S from '../../../styles/feed/feedDetail.style';

import PersonIcon from '../../../assets/images/feed/Person.png';

interface CommentInputProps {
  mentionName: string | null;
  replyText: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  mentionName,
  replyText,
  onChange,
  onClose,
}) => {
  return (
    <div className={S.replyInputWrapper}>
      <img src={PersonIcon} alt="내 프로필" className={S.profileImage} />

      {mentionName && <div className={S.mentionLabel}>@{mentionName}</div>}

      <textarea
        value={replyText}
        onChange={(e) => onChange(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className={S.replyInput}
      />

      <button
        onClick={onClose}
        disabled={replyText.trim().length === 0}
        className={S.submitButton}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;
