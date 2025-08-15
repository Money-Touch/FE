import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
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
  MeasureSpan,
} from '../../styles/budget/routineregistration.styles';
import { useCreateRoutineMutation } from '../../hooks/money/routine/useCreateRoutineMutation';
import { useBudgetDetailQuery } from '../../hooks/money/registration/useBudgetDetailQuery';
import axios from 'axios';

import html2canvas from 'html2canvas';
import RoutinePreview from './preview';
import { useUploadRoutineImageMutation } from '../../hooks/money/routine/useUploadRoutineImageMutation';

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

type UploadImageResult = {
  routineImageUrl?: string;
  routineImgUrl?: string;
  url?: string;
};

const MAX_LEN = 20;
const DEFAULT_CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

type CategoryBudget = {
  categoryId?: number;
  categoryName: string;
  amount: number;
  categoryType?: string;
};

const PLACEHOLDER_TEXT = '# 해시태그';

const RoutineRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { budgetId?: number } };
  const budgetId = location?.state?.budgetId ?? 0;

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

  const valueMeasureRefs = useRef<HTMLSpanElement[]>([]);
  const placeholderMeasureRefs = useRef<HTMLSpanElement[]>([]);
  const [valueWidths, setValueWidths] = useState<number[]>([]);
  const [placeholderWidths, setPlaceholderWidths] = useState<number[]>([]);
  const [focused, setFocused] = useState<boolean[]>([]);

  const thumbRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: uploadImageAsync } = useUploadRoutineImageMutation();

  const [monthBudget, setMonthBudget] = useState(0);
  const [catBudget, setCatBudget] = useState<number[]>(Array(5).fill(0));
  const [customCats, setCustomCats] = useState<string[]>([]);
  const [customBudget, setCustomBudget] = useState<number[]>([]);

  useEffect(() => {
    setMonthBudget(Number(localStorage.getItem('monthBudget') || 0));

    const savedCat = JSON.parse(
      localStorage.getItem('categoryBudgets') || '[]',
    );
    if (savedCat.length === 5) setCatBudget(savedCat);

    const savedCurs = JSON.parse(
      localStorage.getItem('customCategories') || '[]',
    );
    setCustomCats(savedCurs);

    const savedCBudg = JSON.parse(
      localStorage.getItem('customCategoryBudgets') || '[]',
    );
    setCustomBudget(
      savedCBudg.length ? savedCBudg : Array(savedCurs.length).fill(0),
    );
  }, []);

  const { data: budgetDetail } = useBudgetDetailQuery(budgetId);

  const defaultServerCats: CategoryBudget[] =
    (budgetDetail?.result?.defaultCategoryBudgets as
      | CategoryBudget[]
      | undefined) ?? [];
  const customServerCats: CategoryBudget[] =
    (budgetDetail?.result?.customCategoryBudgets as
      | CategoryBudget[]
      | undefined) ?? [];

  const serverCategoryNames: string[] = [
    ...defaultServerCats,
    ...customServerCats,
  ]
    .map((c) => c.categoryName)
    .filter((name): name is string => !!name);

  const localMap = new Map<string, number>([
    ...DEFAULT_CATEGORIES.map((name, i) => [name, catBudget[i] || 0] as const),
    ...customCats.map((name, i) => [name, customBudget[i] || 0] as const),
  ]);

  const buildBudgetListFromServer = () => {
    const base = serverCategoryNames.map((name) => ({
      categoryName: name,
      amount: localMap.get(name) ?? 0,
    }));
    const extras = Array.from(localMap.entries())
      .filter(([name]) => !serverCategoryNames.includes(name))
      .map(([name, amount]) => ({ categoryName: name, amount }));
    return [...base, ...extras];
  };

  const previewCategories = (() => {
    const base = serverCategoryNames.map((name) => ({
      name,
      amount: localMap.get(name) ?? 0,
    }));
    const extras = Array.from(localMap.entries())
      .filter(([name]) => !serverCategoryNames.includes(name))
      .map(([name, amount]) => ({ name, amount }));
    return [...base, ...extras];
  })();

  const previewTags = tags
    .map((t) => (t || '').trim())
    .filter(Boolean)
    .filter((t) => t !== '#')
    .map((t) => t.replace(/^#+\s*/, '#').replace(/\s+/g, ''));

  const captureAndUpload = async (): Promise<string | undefined> => {
    if (!thumbRef.current) return undefined;

    const canvas = await html2canvas(thumbRef.current, {
      backgroundColor: '#ffffff',
      scale: window.devicePixelRatio || 1,
      useCORS: true,
    });

    const blob: Blob | null = await new Promise((res) =>
      canvas.toBlob(res, 'image/png', 0.92),
    );
    if (!blob) return undefined;

    const fd = new FormData();
    fd.append('file', blob, 'routine-preview.png');

    const resp = (await uploadImageAsync(fd)) as ApiResponse<UploadImageResult>;
    const url =
      resp?.result?.routineImageUrl ??
      resp?.result?.routineImgUrl ??
      resp?.result?.url;
    return url;
  };

  const totalBudget = [...catBudget, ...customBudget].reduce(
    (a, b) => a + b,
    0,
  );

  const onChangeTag = (idx: number, raw: string) => {
    const val = raw.startsWith('#') ? raw : `# ${raw.replace(/^#+/, '')}`;
    setTags((prev) => prev.map((t, i) => (i === idx ? val : t)));
  };

  const onFocusTag = (idx: number) => {
    setFocused((prev) => {
      const arr = [...prev];
      arr[idx] = true;
      return arr;
    });
    if (tags[idx] === '') {
      setTags((prev) => prev.map((t, i) => (i === idx ? '#' : t)));
    }
  };

  const onBlurTag = (idx: number) => {
    setFocused((prev) => {
      const arr = [...prev];
      arr[idx] = false;
      return arr;
    });
    if (tags[idx] === '#') {
      setTags((prev) => prev.map((t, i) => (i === idx ? '' : t)));
    }
  };

  const addTagField = () => {
    setTags((prev) => [...prev, '']);
  };

  const valid = !!title.trim();
  const { mutate, isPending } = useCreateRoutineMutation();

  const save = async () => {
    if (!valid) return;
    if (!budgetId) {
      alert('예산 ID(budgetId)를 확인할 수 없습니다.');
      return;
    }
    if (!serverCategoryNames.length) {
      alert(
        '예산 카테고리 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
      );
      return;
    }
    if (totalBudget <= 0 || totalBudget !== monthBudget) {
      alert('한 달 예산 합계가 맞지 않습니다.');
      return;
    }

    const normalizedTags = tags
      .map((t) => (t || '').trim())
      .filter(Boolean)
      .filter((t) => t !== '#')
      .map((t) => t.replace(/^#+\s*/, '#').replace(/\s+/g, ''));

    const imageUrl = await captureAndUpload().catch(() => undefined);

    mutate(
      {
        budgetId,
        body: {
          routineImgUrl: imageUrl || undefined,
          totalBudget,
          routineName: title.trim(),
          hashtags: normalizedTags,
          budgetList: buildBudgetListFromServer(),
        },
      },
      {
        onSuccess: () => {
          alert('소비 루틴이 등록되었습니다.');
          navigate('/money', { replace: true, state: { tab: '소비 루틴' } });
        },
        onError: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            const msg =
              (err.response?.data as { message?: string })?.message ||
              err.message ||
              '등록에 실패했습니다.';
            alert(msg);
          } else if (err instanceof Error) {
            alert(err.message || '등록에 실패했습니다.');
          } else {
            alert('등록에 실패했습니다.');
          }
        },
      },
    );
  };

  const MIN_W = 28;
  const PAD = 6;

  const measureAll = () => {
    setValueWidths((prev) => {
      const arr = [...prev];
      for (let i = 0; i < tags.length; i++) {
        const span = valueMeasureRefs.current[i];
        const w = span ? Math.ceil(span.offsetWidth + PAD) : MIN_W;
        arr[i] = Math.max(MIN_W, w);
      }
      return arr;
    });
    setPlaceholderWidths((prev) => {
      const arr = [...prev];
      for (let i = 0; i < tags.length; i++) {
        const span = placeholderMeasureRefs.current[i];
        const w = span ? Math.ceil(span.offsetWidth + PAD) : 0;
        arr[i] = w;
      }
      return arr;
    });
  };

  useLayoutEffect(() => {
    measureAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags.length]);

  useEffect(() => {
    measureAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags.join('\u0001'), focused.join()]);

  const calcWidth = (idx: number) => {
    const val = tags[idx] ?? '';
    const hasRealText = val.trim().length > 0;
    const isFocused = !!focused[idx];

    const base = placeholderWidths[idx] || 0;
    const content = valueWidths[idx] || MIN_W;

    if (!hasRealText) {
      return base || 120;
    }

    if (isFocused) {
      return Math.max(base, content);
    }

    return Math.max(MIN_W, content);
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
            maxLength={MAX_LEN}
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
          <PlusBtn
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={addTagField}
          >
            <img src={plusIcon} alt="plus" />
          </PlusBtn>

          {tags.map((tag, idx) => {
            const appliedWidth = calcWidth(idx);

            return (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  position: 'relative',
                }}
              >
                <MeasureSpan
                  ref={(el) => {
                    if (el) valueMeasureRefs.current[idx] = el;
                  }}
                  aria-hidden
                >
                  {(tag && tag.length > 0 ? tag : '') || ' '}
                </MeasureSpan>

                <MeasureSpan
                  ref={(el) => {
                    if (el) placeholderMeasureRefs.current[idx] = el;
                  }}
                  aria-hidden
                >
                  {PLACEHOLDER_TEXT}
                </MeasureSpan>

                <TagInput
                  $wpx={appliedWidth}
                  ref={(el) => {
                    if (el) inputRefs.current[idx] = el;
                  }}
                  value={tag}
                  placeholder={PLACEHOLDER_TEXT}
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
              </span>
            );
          })}
        </TagsInBox>

        <Save disabled={!valid || isPending} onClick={save}>
          {isPending ? '등록 중…' : '등록'}
        </Save>

        <div
          style={{ position: 'fixed', left: -99999, top: -99999 }}
          aria-hidden
        >
          <div ref={thumbRef}>
            <RoutinePreview
              variant="mini"
              title={title.trim() || '나의 소비 루틴'}
              hashtags={previewTags}
              totalBudget={totalBudget}
              categories={previewCategories}
              nickname="라인"
            />
          </div>
        </div>
      </Body>
    </Wrap>
  );
};

export default RoutineRegistration;
