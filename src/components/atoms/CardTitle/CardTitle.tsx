import { forwardRef, useMemo } from 'react';

import type { ICardTitleProps } from './CardTitle.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { cardTitleStyles } from './CardTitle.styles';
import { cardTitleTheme } from './CardTitle.stylex';

export const CardTitle = forwardRef<HTMLDivElement, ICardTitleProps>(
  function CardTitle(props, forwardedRef) {
    const { styles, sx, headline, subhead, supportingText, ...other } = props;

    const { overridenStyles } = useComponentTheme('CardTitle');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(cardTitleStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(cardTitleTheme, overridenStyles, 'host', sx)}
        ref={forwardedRef}
        {...other}
      >
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
