import type { UserRoutine } from '../../types/home/routine';
import type { UserRoutineDetail } from '../../types/home/routine';
import routine_t from '../../assets/images/home/routine_t.png';
import profile_t from '../../assets/images/home/profile_t.png';
import thumbnail from '../../assets/images/home/notify/ex1.png';

export const mockRoutineData: UserRoutine[] = [
  {
    id: 1,
    title: '50만원으로 한 달 살기 루틴',
    icon: routine_t,
    startDate: '2025-07-09',
    views: 300,
  },
  {
    id: 2,
    title: '배달 끊고 집밥 먹기 예산',
    icon: routine_t,
    startDate: '2025-07-09',
    views: 200,
  },
  {
    id: 3,
    title: '커피값을 아끼자',
    icon: routine_t,
    startDate: '2025-07-07',
    views: 100,
  },
  {
    id: 4,
    title: '쇼핑은 10만원만',
    icon: routine_t,
    startDate: '2025-07-06',
    views: 10,
  },
  {
    id: 5,
    title: '줄줄 새는 고정비 확인하기',
    icon: routine_t,
    startDate: '2025-07-01',
    views: 50,
  },
];

export const mockRoutineDetailData: UserRoutineDetail[] = [
  {
    id: 1,
    title: '50만원으로 한 달 살기 루틴',
    icon: routine_t,
    startDate: '2025-07-20',
    views: 300,
    hashtags: ['#식비절약', '#생활비'],
    thumbnail: thumbnail,
    author: '라인',
    authorProfileImg: profile_t,
  },
  {
    id: 2,
    title: '배달 끊고 집밥 먹기 예산',
    icon: routine_t,
    startDate: '2025-05-09',
    views: 200,
    hashtags: ['#식비절약', '#배달끊기'],
    thumbnail: thumbnail,
    author: '이즈',
    authorProfileImg: profile_t,
  },
  {
    id: 3,
    title: '커피값을 아끼자',
    icon: routine_t,
    startDate: '2025-07-20',
    views: 100,
    hashtags: ['#커피절약'],
    thumbnail: thumbnail,
    authorProfileImg: profile_t,
    author: '오리',
  },
  {
    id: 4,
    title: '쇼핑은 10만원만',
    icon: routine_t,
    startDate: '2025-07-06',
    views: 10,
    hashtags: ['#쇼핑절제', '#지출관리'],
    thumbnail: thumbnail,
    authorProfileImg: profile_t,
    author: '앨빈',
  },
  {
    id: 5,
    title: '줄줄 새는 고정비 확인하기',
    icon: routine_t,
    startDate: '2025-07-01',
    views: 50,
    hashtags: ['#고정비정리', '#자동이체점검'],
    thumbnail: thumbnail,
    authorProfileImg: profile_t,
    author: '잔디',
  },
];
