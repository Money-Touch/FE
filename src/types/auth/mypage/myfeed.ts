// list-grid
export interface ListGridProps {
  selectedId: number;
  setSelectedId: (id: number) => void;
}

// item-grid
interface ItemGrid {
  id: number;
  name: string;
  image: string;
  imageClick: string;
  viewMode: string;
}

export interface ItemGridProps {
  item: ItemGrid;
  isSelected: boolean;
  onClick: (id: number) => void;
}

// list-grid4.tsx, list-grid2.tsx, item-grid4.tsx, item-grid2.tsx
export interface Feed {
  consumptionRecordId: number;
  userId: number;
  imageUrls: string[];
  amount: number;
  content: string;
  createdAt: string;
}

export interface FeedResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    feedList: Feed[];
    isFirst: boolean;
    hasNext: boolean;
    nextCursorId: number;
    nextCursorViewCount: number;
    feedListSize: number;
  };
}

export interface ListFeedProps {
  data?: Feed[];
}

export interface ItemFeedProps {
  item: Feed;
}
