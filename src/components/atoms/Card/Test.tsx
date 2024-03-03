import { forwardRef } from 'react';

import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
} from './types';

type ITextProps<TRoot extends React.ElementType> =
  IPolymorphicComponentPropsWithRef<
    TRoot,
    {
      children: React.ReactNode;
      font?: 'thin' | 'regular' | 'heavy';
      size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
    }
  >;

type ITextComponent = <TRoot extends React.ElementType = 'span'>(
  props: ITextProps<TRoot>,
) => React.ReactNode | null;

export const Text: ITextComponent = forwardRef(function Text<
  TRoot extends React.ElementType = 'span',
>(
  { as, children, font = 'regular', size = '4', ...other }: ITextProps<TRoot>,
  ref?: IPolymorphicRef<TRoot>,
) {
  const classes = `${font} ${size}`;
  const Component = as || 'span';

  return (
    <Component {...other} className={classes} ref={ref}>
      {children}
    </Component>
  );
});
