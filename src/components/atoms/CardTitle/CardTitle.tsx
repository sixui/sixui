import { forwardRef, useMemo } from 'react';

import type {
  ICardTitleStyleKey,
  ICardTitleStyleVarKey,
} from './CardTitle.styledefs';
import type { ICardTitleProps } from './CardTitleProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export const CardTitle = forwardRef<HTMLDivElement, ICardTitleProps>(
  function CardTitle(props, forwardedRef) {
    const { styles, sx, headline, subhead, supportingText, ...other } = props;

    const { theme } = useComponentTheme('CardTitle');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<ICardTitleStyleKey, ICardTitleStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', theme.vars, sx)} ref={forwardedRef} {...other}>
        <div {...sxf('header')}>
          {headline ? <div {...sxf('headline')}>{headline}</div> : null}
          {subhead ? <div {...sxf('subhead')}>{subhead}</div> : null}
        </div>
        {supportingText ? (
          <div {...sxf('supportingText')}>{supportingText}</div>
        ) : null}
      </div>
    );
  },
);
