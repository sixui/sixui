import { forwardRef, useMemo } from 'react';

import type { ICardActionsProps } from './CardActions.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { cardActionsStyles } from './CardActions.styles';

export const CardActions = forwardRef<HTMLDivElement, ICardActionsProps>(
  function CardActions(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const componentTheme = useComponentTheme('CardActions');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(cardActionsStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...other}
        {...sxf(componentTheme.overridenStyles, 'host', sx)}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
