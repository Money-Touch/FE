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
}

export interface ItemGridProps {
  item: ItemGrid;
  isSelected: boolean;
  onClick: (id: number) => void;
}

// list-grid4.tsx, list-grid2.tsx, item-grid4.tsx, item-grid2.tsx
interface Feed {
  id: number;
  name: string;
  email: string;
}

export interface ListFeedProps {
  data?: Feed[];
}

export interface ItemFeedProps {
  item: Feed;
}

// item-grid2.tsx
export interface ItemGrid2PProps {
  fontSize?: string;
  fontWeight?: number;
  color?: string;
}
