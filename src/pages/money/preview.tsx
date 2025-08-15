type CategoryItem = { name: string; amount: number };

export type RoutinePreviewProps = {
  variant?: 'full' | 'mini';
  title?: string;
  nickname?: string;
  hashtags?: string[];
  totalBudget?: number;
  categories?: CategoryItem[];
};

const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const THUMB_WIDTH = 360;

export default function RoutinePreview({
  variant = 'full',
  title = '나의 소비 루틴',
  nickname = '라인',
  hashtags = [],
  totalBudget,
  categories = [],
}: RoutinePreviewProps) {
  const tags = (hashtags || [])
    .filter(Boolean)
    .map((t) => t.trim())
    .map((t) => (t.startsWith('#') ? t : `#${t}`))
    .slice(0, 3);

  const now = new Date();
  const dateStr = `${now.getFullYear()} • ${String(now.getMonth() + 1).padStart(
    2,
    '0',
  )} • ${String(now.getDate()).padStart(2, '0')}`;

  const allCats = categories;

  const LeftSummary = ({ fullBleed = false }: { fullBleed?: boolean }) => {
    const dense = allCats.length > 6;

    return (
      <div
        style={{
          width: fullBleed ? '100%' : 128,
          padding: fullBleed ? 24 : 12,
          borderRadius: fullBleed ? 0 : 12,
          background: '#f8fafc',
          color: '#475569',
          boxSizing: 'border-box',
          boxShadow: fullBleed ? 'none' : '0 2px 10px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: fullBleed ? (dense ? 8 : 10) : 8,
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
        }}
      >
        <div style={{ fontSize: fullBleed ? 14 : 10, color: '#64748B' }}>
          한 달 예산
        </div>

        <div
          style={{
            fontSize: fullBleed ? 22 : 14,
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.2,
            marginTop: 2,
          }}
        >
          {totalBudget != null ? `${comma(totalBudget)}원` : '-'}
        </div>

        <div
          style={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: fullBleed ? (dense ? 8 : 10) : 6,
          }}
        >
          {allCats.map((c) => (
            <div
              key={c.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                columnGap: fullBleed ? 12 : 6,
                fontSize: fullBleed ? (dense ? 13 : 14) : 10,
                lineHeight: 1.25,
              }}
            >
              <span
                style={{
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={c.name}
              >
                {c.name}
              </span>
              <span>{comma(c.amount)}원</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (variant === 'mini') {
    return (
      <div
        style={{
          width: THUMB_WIDTH,
          background: '#fff',
          borderRadius: 16,
        }}
      >
        <LeftSummary fullBleed />
      </div>
    );
  }

  return (
    <div
      style={{
        width: 320,
        height: 148,
        borderRadius: 16,
        background: '#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        fontFamily: 'inherit',
      }}
    >
      {/* 왼쪽 요약 */}
      <div style={{ padding: 16, display: 'flex', alignItems: 'center' }}>
        <LeftSummary />
      </div>

      {/* 오른쪽 정보 */}
      <div style={{ flex: 1, padding: 16, color: '#111827' }}>
        <div style={{ fontSize: 10, color: '#64748B' }}>{dateStr}</div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 6,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#e2e8f0',
            }}
          />
          <div style={{ fontSize: 12, color: '#343155' }}>{nickname}</div>
        </div>

        <div
          style={{
            fontWeight: 800,
            fontSize: 16,
            marginTop: 5,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={title}
        >
          {title}
        </div>

        <div
          style={{ display: 'flex', gap: 6, overflow: 'hidden', marginTop: 6 }}
        >
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                color: '#334155',
                background: '#f1f5f9',
                borderRadius: 8,
                padding: '2px 6px',
                maxWidth: 120,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={t}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
