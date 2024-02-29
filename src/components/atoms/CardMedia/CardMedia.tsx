import { useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { ICardMediaStyleKey } from './CardMedia.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ICardMediaProps = IContainerProps<ICardMediaStyleKey> &
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

  const styleProps = useMemo(
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
