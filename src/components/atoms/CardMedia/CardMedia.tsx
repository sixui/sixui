import { forwardRef, useMemo } from 'react';

import type { ICardMediaStyleKey } from './CardMedia.styledefs';
import type { ICardMediaProps } from './CardMediaProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { commonStyles } from '@/helpers/commonStyles';

export const CardMedia = forwardRef<HTMLDivElement, ICardMediaProps>(
  function CardMedia(props, forwardedRef) {
    const { styles, sx, children, src, ...other } = props;

    const { theme } = useComponentThemeOld('CardMedia');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<ICardMediaStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(
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
