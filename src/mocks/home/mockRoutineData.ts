import type { UserRoutine } from '../../types/home/routine';
import routine_t from '../../assets/images/home/routine_t.png';

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
