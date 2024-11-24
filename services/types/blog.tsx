export interface Blog {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  content?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof Blog;
  direction: SortDirection;
}