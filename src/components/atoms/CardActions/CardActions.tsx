import { forwardRef, useMemo } from 'react';

import type { ICardActionsStyleKey } from './CardActions.styledefs';
import type { ICardActionsProps } from './CardActionsProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';

export const CardActions = forwardRef<HTMLDivElement, ICardActionsProps>(
  function CardActions(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { theme } = useComponentThemeOld('CardActions');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<ICardActionsStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', sx)} ref={forwardedRef} {...other}>
        {children}
      </div>
    );
  },
);
