import { forwardRef, useContext, useMemo } from 'react';

import type {
  ICardContentStyleKey,
  ICardContentStyleVarKey,
} from './CardContent.styledefs';
import type { ICardContentProps } from './CardContentProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { CardContext } from '@/components/atoms/Card';

export const CardContent = forwardRef<HTMLDivElement, ICardContentProps>(
  function CardContent(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { theme } = useComponentThemeOld('CardContent');
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
        ref={forwardedRef}
        {...other}
      >
        {children}
      </div>
    );
  },
);
