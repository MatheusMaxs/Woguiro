import type { WorkFilter } from '@/data/homeContent';

export interface HomeNavigateOptions {
  targetId: string;
  filter?: WorkFilter;
  expandArchive?: boolean;
  expandAbout?: boolean;
}

export type HomeNavigate = (options: HomeNavigateOptions) => void;
