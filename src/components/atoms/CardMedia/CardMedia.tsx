import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { ICardMediaStyleKey } from './CardMedia.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { commonStyles } from '@/helpers/commonStyles';

export type ICardMediaProps = IContainerProps<ICardMediaStyleKey> & {
  children?: React.ReactNode;
  src?: string;
  title?: string;
};

export const CardMedia = forwardRef<HTMLDivElement, ICardMediaProps>(
  function CardMedia(props, forwardedRef) {
    const { styles, sx, children, src, ...other } = props;

    const { theme } = useComponentTheme('CardMedia');
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
