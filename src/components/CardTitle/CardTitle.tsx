import { forwardRef } from 'react';

import type { ICardTitleProps } from './CardTitle.types';
import { useStyles } from '~/hooks/useStyles';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { Stack } from '../Stack';
import { cardTitleStyles } from './CardTitle.styles';
import { cardTitleTheme } from './CardTitle.stylex';

export const CardTitle = createPolymorphicComponent<'div', ICardTitleProps>(
  forwardRef<HTMLDivElement, ICardTitleProps>(
    function CardTitle(props, forwardedRef) {
      const { styles, sx, headline, subhead, supportingText, ...other } = props;

      const { getStyles, globalStyles } = useStyles({
        componentName: 'CardTitle',
        styles: [cardTitleStyles, styles],
      });

      return (
        <Stack
          gap={2}
          {...other}
          sx={[cardTitleTheme, globalStyles, sx]}
          ref={forwardedRef}
        >
          <div {...getStyles('header')}>
            {headline ? <div {...getStyles('headline')}>{headline}</div> : null}
            {subhead ? <div {...getStyles('subhead')}>{subhead}</div> : null}
          </div>
          {supportingText ? (
            <div {...getStyles('supportingText')}>{supportingText}</div>
          ) : null}
        </Stack>
      );
    },
  ),
);
