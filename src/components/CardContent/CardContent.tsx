import { forwardRef, useContext } from 'react';

import type { ICardContentProps } from './CardContent.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { useStyles } from '~/hooks/useStyles';
import { CardContext } from '../Card';
import { Stack } from '../Stack';
import { cardContentStyles } from './CardContent.styles';
import { cardContentTheme } from './CardContent.stylex';

export const CardContent = createPolymorphicComponent<'div', ICardContentProps>(
  forwardRef<HTMLDivElement, ICardContentProps>(
    function CardContent(props, forwardedRef) {
      const { styles, sx, children, ...other } = props;

      const { combineStyles, globalStyles } = useStyles({
        componentName: 'CardContent',
        styles: [cardContentStyles, styles],
      });

      const context = useContext(CardContext);
      const { actionable } = context ?? {};

      return (
        <Stack
          gap={4}
          {...other}
          sx={[
            cardContentTheme,
            globalStyles,
            combineStyles('host', actionable && 'host$actionable'),
            sx,
          ]}
          ref={forwardedRef}
        >
          {children}
        </Stack>
      );
    },
  ),
);
