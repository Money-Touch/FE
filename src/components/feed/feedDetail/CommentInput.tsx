import React from 'react';
import * as S from '../../../styles/feed/feedDetail.style';

import PersonIcon from '../../../assets/images/feed/Person.png';

interface CommentInputProps {
  mentionName: string | null;
  replyText: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ mentionName, replyText, onChange, onClose }) => {
  return (
    <S.ReplyInputWrapper>
      <S.ProfileImage src={PersonIcon} alt="내 프로필" />

      {mentionName && (
        <S.MentionLabel>@{mentionName}</S.MentionLabel>
      )}

      <S.ReplyInput
        value={replyText}
        onChange={(e) => onChange(e.target.value)}
        placeholder="댓글을 입력해주세요."
      />

      <S.SubmitButton
        onClick={onClose}
        disabled={replyText.trim().length === 0}
      >
        등록
      </S.SubmitButton>
    </S.ReplyInputWrapper>
  );
};

export default CommentInput;