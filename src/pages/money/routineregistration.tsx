import { useEffect, useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/common/colors';
import leftArrow from '../../assets/images/header/leftArrow.png';

const RoutineRegistration = () => {
  const navigate = useNavigate();
  const outletCtx = useOutletContext<{
    setHideFooter: (b: boolean) => void;
  } | null>();
  const setHideFooter = outletCtx?.setHideFooter;

  useEffect(() => {
    setHideFooter?.(true);
    return () => setHideFooter?.(false);
  }, [setHideFooter]);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState<string[]>(['']);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const onChangeTag = (idx: number, raw: string) => {
    const val = raw.startsWith('#') ? raw : `#${raw.replace(/^#+/, '')}`;
    setTags((prev) => prev.map((t, i) => (i === idx ? val : t)));

    const input = inputRefs.current[idx];
    if (input) {
      input.style.width = '20px'; // 줄이기 위해 초기화
      input.style.width = `${input.scrollWidth}px`; // 내용 기반 너비 설정
    }
  };

  const onFocusTag = (idx: number) => {
    if (tags[idx] === '') {
      setTags((prev) => prev.map((t, i) => (i === idx ? '#' : t)));
    }
  };

  const onBlurTag = (idx: number) => {
    if (tags[idx] === '#') {
      setTags((prev) => prev.map((t, i) => (i === idx ? '' : t)));
    }
  };

  const addTagField = () => {
    setTags((prev) => [...prev, '']);
    setTimeout(() => {
      const len = inputRefs.current.length;
      const el = inputRefs.current[len - 1];
      if (el) {
        el.style.width = `${el.scrollWidth}px`;
        el.focus();
      }
    }, 0);
  };

  const valid = !!title.trim();

  const save = () => {
    if (!valid) return;
    const routine = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      tags: tags.map((t) => t.trim()).filter((t) => t && t !== '#'),
    };
    const prev = JSON.parse(localStorage.getItem('routineEntries') || '[]');
    localStorage.setItem('routineEntries', JSON.stringify([...prev, routine]));
    navigate('/money', { replace: true, state: { tab: '소비 루틴' } });
  };

  return (
    <Wrap>
      <Header>
        <IconBtnLeft onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="back" />
        </IconBtnLeft>
        <H1>소비 루틴 등록</H1>
      </Header>

      <Body>
        <Label>
          루틴 이름<span>*</span>
        </Label>
        <Input
          placeholder="소비 루틴 이름을 입력해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Label>
          소개<span>*</span>
        </Label>
        <TextareaWrap>
          <Textarea
            placeholder="1000자 이내로 작성해 주세요."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <TagsInBox>
            <PlusBtn type="button" onClick={addTagField}>
              +
            </PlusBtn>
            {tags.map((tag, idx) => (
              <TagInput
                key={idx}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[idx] = el;
                    el.style.width = `${el.scrollWidth}px`;
                  }
                }}
                value={tag}
                placeholder="#해시태그"
                onChange={(e) => onChangeTag(idx, e.target.value)}
                onFocus={() => onFocusTag(idx)}
                onBlur={() => onBlurTag(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    inputRefs.current[idx]?.blur();
                  }
                }}
              />
            ))}
          </TagsInBox>
        </TextareaWrap>

        <Save disabled={!valid} onClick={save}>
          등록
        </Save>
      </Body>
    </Wrap>
  );
};

export default RoutineRegistration;

/* ---------------- styled-components ---------------- */

const Wrap = styled.div`
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.G8};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }
`;

const IconBtnLeft = styled(IconBase)`
  left: 16px;
`;

const H1 = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

const Body = styled.main`
  flex: 1;
  padding: 24px 16px 0;
`;

const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;

  span {
    margin-left: 2px;
    color: ${colors.M1};
  }
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid ${colors.G7};
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 24px;

  &::placeholder {
    color: ${colors.G6};
  }
`;

const TextareaWrap = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 14px;
  padding-bottom: 60px;
  border: 1px solid ${colors.G7};
  border-radius: 10px;
  font-size: 14px;
  resize: none;

  &::placeholder {
    color: ${colors.G6};
  }
`;

const TagsInBox = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const PlusBtn = styled.button`
  width: 20px;
  height: 20px;
  font-size: 20px;
  line-height: 1;
  color: ${colors.G5};
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TagInput = styled.input`
  width: 70px;
  min-width: 20px;
  max-width: 100%;
  padding: 4px 6px;
  font-size: 12px;
  border: none;
  border-radius: 8px;
  background: #e5f8e7;
  color: ${colors.mainColor1};
  flex: 0 0 auto;

  &::placeholder {
    color: ${colors.mainColor1};
    opacity: 0.5;
  }

  &:focus {
    outline: 1px solid ${colors.mainColor1};
  }
`;

const Save = styled.button<{ disabled?: boolean }>`
  margin: 24px 0 160px;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
