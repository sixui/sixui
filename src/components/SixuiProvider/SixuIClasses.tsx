import { useThemeContext } from '../ThemeProvider';

// FIXME: delete
export const SixuiClasses: React.FC = () => {
  const theme = useThemeContext();

  const classes = keys(theme.breakpoints).reduce<string>((acc, breakpoint) => {
    const isPxBreakpoint = theme.breakpoints[breakpoint].includes('px');
    const pxValue = px(theme.breakpoints[breakpoint]) as number;
    const maxWidthBreakpoint = isPxBreakpoint
      ? `${pxValue - 0.1}px`
      : em(pxValue - 0.1);
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);

    return `${acc}@media (max-width: ${maxWidthBreakpoint}) {.sixui-visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.sixui-hidden-from-${breakpoint} {display: none !important;}}`;
  }, '');

  return (
    <style
      data-sixui-styles="classes"
      dangerouslySetInnerHTML={{ __html: classes }}
    />
  );
};
