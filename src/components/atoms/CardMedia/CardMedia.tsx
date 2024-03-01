import stylex from '@stylexjs/stylex';
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

const styles = stylex.create({
  image: (src: string) => ({
    backgroundImage: `url("${src}")`,
  }),
});

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
    <div {...styleProps(['host', props.sx])} role='img' title={title}>
      <div {...styleProps(['image', src ? styles.image(src) : undefined])} />
      {children}
    </div>
  );
};
