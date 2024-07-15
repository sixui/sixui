import stylex from '@stylexjs/stylex';

export type ITabListStylesKey = keyof typeof tabListStyles;
export const tabListStyles = stylex.create({
  host: {
    flexDirection: 'column',
    // overflow: 'auto',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    position: 'relative',
    display: {
      default: 'flex',
      '::-webkit-scrollbar': 'none',
    },
  },
  tabList: {
    alignItems: 'end',
    height: '100%',
    overflow: 'inherit',
    justifyContent: 'space-between',
  },
  tabList$fullWidth: {
    display: 'flex',
    width: '100%',
  },
});
