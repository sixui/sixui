import { forwardRef } from 'react';

import type { ICardTitleProps } from './CardTitle.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { cardTitleStyles } from './CardTitle.styles';
import { cardTitleTheme } from './CardTitle.stylex';

export const CardTitle = createPolymorphicComponent<'div', ICardTitleProps>(
  forwardRef<HTMLDivElement, ICardTitleProps>(
    function CardTitle(props, forwardedRef) {
      const { styles, sx, headline, subhead, supportingText, ...other } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'CardTitle',
        styles: [cardTitleStyles, styles],
      });

      return (
        <Base
          {...other}
          sx={[cardTitleTheme, globalStyles, combineStyles('host'), sx]}
          ref={forwardedRef}
        >
          <div {...getStyles('header')}>
            {headline ? <div {...getStyles('headline')}>{headline}</div> : null}
            {subhead ? <div {...getStyles('subhead')}>{subhead}</div> : null}
          </div>
          {supportingText ? (
            <div {...getStyles('supportingText')}>{supportingText}</div>
          ) : null}
        </Base>
      );
    },
  ),
);
