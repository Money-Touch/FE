export interface ProcessedDataItem {
  categoryName: string;
  percentage: number;
  color: string;
  isOther?: boolean;
  items?: ProcessedDataItem[];
}

export interface TopCategory {
  categoryName: string;
  percentage: number;
}

export interface StatisticsResult {
  topCategories: TopCategory[];
  hasOthers: boolean;
  othersPercent: number;
  mostSpentCategoryName: string;
}

export interface StatisticsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: StatisticsResult;
}
