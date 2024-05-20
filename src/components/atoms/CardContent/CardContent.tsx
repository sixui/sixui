import { forwardRef, useContext, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  ICardContentStyleKey,
  ICardContentStyleVarKey,
} from './CardContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { CardContext } from '@/components/atoms/Card';

export type ICardContentProps = IContainerProps<ICardContentStyleKey> & {
  children?: React.ReactNode;
};

export const CardContent = forwardRef<HTMLDivElement, ICardContentProps>(
  function CardContent(props, ref) {
    const { styles, sx, children, ...other } = props;

    const { theme } = useComponentTheme('CardContent');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<ICardContentStyleKey, ICardContentStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    const context = useContext(CardContext);
    const { actionable } = context ?? {};

    return (
      <div
        {...sxf('host', actionable ? 'host$actionable' : null, theme.vars, sx)}
        ref={ref}
        {...other}
      >
        {children}
      </div>
    );
  },
);
