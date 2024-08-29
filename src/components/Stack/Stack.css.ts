import { createTheme, style, styleVariants } from '@vanilla-extract/css';

export type IStackVariant = 'horizontal' | 'vertical';
export type IStackStyleName = keyof typeof stackStyles;

export const [stackTheme, stackTokens] = createTheme({
  //
});

const root = style({
  display: 'flex',
});

export const stackStyles = {
  root,
  //
};

// TODO: delete variants?
export const stackVariants: Partial<
  Record<IStackStyleName, Partial<Record<IStackVariant, string>>>
> = {
  root: styleVariants({
    horizontal: {
      flexDirection: 'row',
    },
    vertical: {
      flexDirection: 'column',
    },
  }),
};
