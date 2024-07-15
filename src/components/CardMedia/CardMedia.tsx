import { forwardRef, useMemo } from 'react';

import type { ICardMediaProps } from './CardMedia.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { commonStyles } from '@/helpers/commonStyles';
import { cardMediaStyles } from './CardMedia.styles';
import { cardMediaTheme } from './CardMedia.stylex';

export const CardMedia = forwardRef<HTMLDivElement, ICardMediaProps>(
  function CardMedia(props, forwardedRef) {
    const { styles, sx, children, src, ...other } = props;

    const { overridenStyles } = useComponentTheme('CardMedia');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(cardMediaStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(
          cardMediaTheme,
          overridenStyles,
          'host',
          'host$image',
          src ? commonStyles.backgroundImage(src) : undefined,
          sx,
        )}
        role='img'
        ref={forwardedRef}
        {...other}
      >
        {children}
      </div>
    );
  },
);
