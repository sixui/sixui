import { forwardRef, useContext } from 'react';

import type { ICardContentProps } from './CardContent.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { CardContext } from '../Card';
import { Base } from '../Base';
import { cardContentStyles } from './CardContent.styles';
import { cardContentTheme } from './CardContent.stylex';

export const CardContent = createPolymorphicComponent<'div', ICardContentProps>(
  forwardRef<HTMLDivElement, ICardContentProps>(
    function CardContent(props, forwardedRef) {
      const { styles, sx, children, ...other } = props;

      const { combineStyles, globalStyles } = useStyles({
        name: 'CardContent',
        styles: [cardContentStyles, styles],
      });

      const context = useContext(CardContext);
      const { actionable } = context ?? {};

      return (
        <Base
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
        </Base>
      );
    },
  ),
);
