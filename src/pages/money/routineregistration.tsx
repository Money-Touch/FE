import { useEffect, useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from '../../components/header/header';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import plusIcon from '../../assets/images/budget/plus3.png';

import {
  Wrap,
  Body,
  InputWrapper,
  CircleClose,
  CharCount,
  Label,
  Input,
  TagsInBox,
  PlusBtn,
  TagInput,
  Save,
} from '../../styles/budget/routineregistration.styles';

const MAX_LEN = 20;

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
  const [tags, setTags] = useState<string[]>(['']);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const onChangeTag = (idx: number, raw: string) => {
    const val = raw.startsWith('#') ? raw : `# ${raw.replace(/^#+/, '')}`;
    setTags((prev) => prev.map((t, i) => (i === idx ? val : t)));
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
      inputRefs.current[len - 1]?.focus();
    }, 0);
  };

  const valid = !!title.trim();

  const save = () => {
    if (!valid) return;
    const routine = {
      id: Date.now(),
      title: title.trim(),
      desc: '',
      tags: tags.map((t) => t.trim()).filter((t) => t && t !== '#'),
    };
    const prev = JSON.parse(localStorage.getItem('routineEntries') || '[]');
    localStorage.setItem('routineEntries', JSON.stringify([...prev, routine]));
    navigate('/money', { replace: true, state: { tab: '소비 루틴' } });
  };

  return (
    <Wrap>
      <Header title="소비 루틴 등록" />

      <Body>
        <InputWrapper>
          <Input
            placeholder="소비 루틴 이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CircleClose
            src={circleCloseIcon}
            alt="delete"
            onClick={() => setTitle('')}
          />
          <CharCount>
            {title.length}
            <span>/{MAX_LEN}</span>
          </CharCount>
        </InputWrapper>

        <Label>
          소개<span>*</span>
        </Label>

        <TagsInBox>
          <PlusBtn type="button" onClick={addTagField}>
            <img src={plusIcon} alt="plus" />
          </PlusBtn>
          {tags.map((tag, idx) => (
            <TagInput
              key={idx}
              ref={(el) => {
                if (el) {
                  inputRefs.current[idx] = el;
                }
              }}
              value={tag}
              placeholder="# 해시태그"
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

        <Save disabled={!valid} onClick={save}>
          등록
        </Save>
      </Body>
    </Wrap>
  );
};

export default RoutineRegistration;
