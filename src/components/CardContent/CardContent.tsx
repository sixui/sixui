import { forwardRef, useContext, useMemo } from 'react';

import type { ICardContentProps } from './CardContent.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { CardContext } from '~/components/Card';
import { cardContentStyles } from './CardContent.styles';
import { cardContentTheme } from './CardContent.stylex';

export const CardContent = forwardRef<HTMLDivElement, ICardContentProps>(
  function CardContent(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const componentTheme = useComponentTheme('CardContent');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(cardContentStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const context = useContext(CardContext);
    const { actionable } = context ?? {};

    return (
      <div
        {...other}
        {...sxf(
          cardContentTheme,
          componentTheme.overridenStyles,
          'host',
          actionable ? 'host$actionable' : null,
          sx,
        )}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
