/**
 * Consistent color palette for the entire app
 */

export const colors = {
  // Semantic Colors
  success: {
    light: '#10b981',
    main: '#059669',
    dark: '#047857',
    bg: '#ecfdf5',
  },
  danger: {
    light: '#ef4444',
    main: '#dc2626',
    dark: '#b91c1c',
    bg: '#fef2f2',
  },
  warning: {
    light: '#f59e0b',
    main: '#d97706',
    dark: '#b45309',
    bg: '#fffbeb',
  },
  info: {
    light: '#3b82f6',
    main: '#2563eb',
    dark: '#1d4ed8',
    bg: '#eff6ff',
  },
  primary: {
    light: '#06b6d4',
    main: '#0891b2',
    dark: '#0e7490',
    bg: '#ecfdf5',
  },
  accent: {
    light: '#a855f7',
    main: '#9333ea',
    dark: '#7e22ce',
    bg: '#faf5ff',
  },
  // Status Colors
  status: {
    completed: '#10b981', // green
    pending: '#f59e0b', // amber
    overdue: '#ef4444', // red
    dueSoon: '#f59e0b', // amber
    upcoming: '#3b82f6', // blue
  },
  // Neutral Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Gradients
  gradients: {
    primary: 'from-blue-400 to-blue-600',
    success: 'from-green-400 to-emerald-600',
    danger: 'from-red-400 to-red-600',
    warning: 'from-amber-400 to-orange-600',
    info: 'from-cyan-400 to-blue-600',
    accent: 'from-purple-400 to-pink-600',
  },
};

/**
 * Tailwind class generators for consistent styling
 */
export const colorClasses = {
  successBadge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  dangerBadge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  warningBadge: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  infoBadge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  
  successButton: 'bg-green-600 hover:bg-green-700 text-white',
  dangerButton: 'bg-red-600 hover:bg-red-700 text-white',
  primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
  
  successCard: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700',
  dangerCard: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700',
  warningCard: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700',
  infoCard: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700',
};
