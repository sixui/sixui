import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { ICardMediaStyleKey } from './CardMedia.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface ICardMediaProps
  extends IContainer<ICardMediaStyleKey>,
    Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'title'> {
  children?: React.ReactNode;
}

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
      ),
    [theme.styles, props.styles],
  );

  return (
    <div
      {...styleProps(['host', 'host$image', props.sx])}
      style={{
        backgroundImage: `url("${src}")`,
      }}
      role='img'
      title={title}
    >
      {children}
    </div>
  );
};