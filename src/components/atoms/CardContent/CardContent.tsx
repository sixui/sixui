import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  ICardContentStyleKey,
  ICardContentStyleVarKey,
} from './CardContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useCardContext } from '../Card/useCardContext';

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
    const styleProps = useMemo(
      () =>
        stylePropsFactory<ICardContentStyleKey, ICardContentStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    const context = useCardContext();
    const { actionable } = context ?? {};

    return (
      <div
        {...styleProps(
          ['host', actionable ? 'host$actionable' : null, sx],
          [theme.vars],
        )}
        ref={ref}
        {...other}
      >
        {children}
      </div>
    );
  },
);
