import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { ICardMediaStyleKey } from './CardMedia.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ICardMediaProps = IContainer<ICardMediaStyleKey> &
  Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'title'> & {
    children?: React.ReactNode;
  };

export const CardMedia: React.FC<ICardMediaProps> = ({
  children,
  src,
  title,
  ...props
}) => {
  const theme = useComponentTheme('CardMedia');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ICardMediaStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  return (
    <div
      {...styleProps(['host', 'host$image', props.sx])}
      style={src ? { backgroundImage: `url("${src}")` } : undefined}
      role='img'
      title={title}
    >
      {children}
    </div>
  );
};
