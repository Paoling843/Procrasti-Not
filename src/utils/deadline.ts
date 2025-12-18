/**
 * Calculate task deadline status
 */
export type DeadlineStatus = 'overdue' | 'due-soon' | 'upcoming' | 'none';

const HOUR_MS = 60 * 60 * 1000;

export const getDeadlineStatus = (reminder: number | null | undefined): DeadlineStatus => {
  if (!reminder) return 'none';
  
  const now = Date.now();
  const diff = reminder - now;
  
  if (diff < 0) return 'overdue';
  if (diff <= HOUR_MS) return 'due-soon';
  return 'upcoming';
};

export const formatDeadlineStatus = (status: DeadlineStatus): string => {
  switch (status) {
    case 'overdue':
      return 'OVERDUE';
    case 'due-soon':
      return 'DUE SOON';
    case 'upcoming':
      return 'UPCOMING';
    default:
      return '';
  }
};

export const getStatusColor = (status: DeadlineStatus): string => {
  switch (status) {
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'due-soon':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return '';
  }
};
