export interface DailyCalendarItem {
  consumptionRecordId: number;
  categoryName: string;
  content: string;
  amount: number;
}

export interface DailyCalendarResult {
  date: string;
  items: DailyCalendarItem[];
  itemSize: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  nextCursorId: number | null;
}

export interface DailyCalendarResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: DailyCalendarResult;
}
