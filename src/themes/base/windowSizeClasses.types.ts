export type IWindowSizeClassName =
  | 'compact'
  | 'medium'
  | 'expanded'
  | 'large'
  | 'extraLarge';

export type IWindowSizeClassesTheme = Record<
  IWindowSizeClassName,
  number | null
>;
