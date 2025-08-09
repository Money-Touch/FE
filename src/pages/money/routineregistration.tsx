import { useEffect, useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import leftArrow from '../../assets/images/header/leftArrow.png';
import {
  Wrap,
  Header,
  IconBtnLeft,
  H1,
  Body,
  Label,
  Input,
  TagsInBox,
  PlusBtn,
  TagInput,
  Save,
} from '../../styles/budget/routineregistration.styles';

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
    const val = raw.startsWith('#') ? raw : `#${raw.replace(/^#+/, '')}`;
    setTags((prev) => prev.map((t, i) => (i === idx ? val : t)));

    const input = inputRefs.current[idx];
    if (input) {
      input.style.width = '20px';
      input.style.width = `${input.scrollWidth}px`;
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
      desc: '',
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

        <Save disabled={!valid} onClick={save}>
          등록
        </Save>
      </Body>
    </Wrap>
  );
};

export default RoutineRegistration;
