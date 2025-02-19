export const shouldReduceMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
