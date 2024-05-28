export interface PaginatedList<T> {
    count: number;
    hasNext: boolean;
    hasPrevious: boolean;
    index: number;
    items: T[];
    pages: number;
    size: number;    
  }