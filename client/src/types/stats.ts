export type StatsPeriod = 'today' | 'week' | 'month';

export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsChart {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface CategoriesChart {
  [category: string]: number;
}

