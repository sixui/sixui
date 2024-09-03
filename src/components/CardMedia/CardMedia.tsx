import { forwardRef } from 'react';

import type { ICardMediaProps } from './CardMedia.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { Base } from '../Base';
import { cardMediaStyles } from './CardMedia.styles';
import { cardMediaTheme } from './CardMedia.stylex';

export const CardMedia = createPolymorphicComponent<'div', ICardMediaProps>(
  forwardRef<HTMLDivElement, ICardMediaProps>(
    function CardMedia(props, forwardedRef) {
      const { styles, sx, children, src, ...other } = props;

      const { combineStyles, globalStyles } = useStyles({
        componentName: 'CardMedia',
        styles: [cardMediaStyles, styles],
      });

      return (
        <Base
          role='img'
          {...other}
          sx={[
            cardMediaTheme,
            globalStyles,
            combineStyles(
              'host',
              'host$image',
              !!src && commonStyles.backgroundImage(src),
            ),
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
