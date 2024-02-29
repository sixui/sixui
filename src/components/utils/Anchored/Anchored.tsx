import * as React from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { IAnchoredStyleKey } from './Anchored.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IAnchoredProps = IContainerProps<IAnchoredStyleKey> & {
  verticalOrigin?: 'top' | 'bottom';
  horizontalOrigin?: 'left' | 'right';
  overlap?: 'rectangular' | 'circular';
  children: React.ReactNode;
  content?: React.ReactNode;
  invisible?: boolean;
};

export const Anchored: React.FC<IAnchoredProps> = ({
  horizontalOrigin = 'right',
  verticalOrigin = 'top',
  overlap = 'rectangular',
  children,
  content,
  ...props
}) => {
  const theme = useComponentTheme('Anchored');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IAnchoredStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  const invisible = props.invisible || !content;

  const contentPositionClassname =
    overlap === 'rectangular'
      ? verticalOrigin === 'top'
        ? horizontalOrigin === 'right'
          ? 'content$rectangular$top$right'
          : 'content$rectangular$top$left'
        : horizontalOrigin === 'right'
          ? 'content$rectangular$bottom$right'
          : 'content$rectangular$bottom$left'
      : verticalOrigin === 'top'
        ? horizontalOrigin === 'right'
          ? 'content$circular$top$right'
          : 'content$circular$top$left'
        : horizontalOrigin === 'right'
          ? 'content$circular$bottom$right'
          : 'content$circular$bottom$left';

  return (
    <div {...styleProps(['host', props.sx], [props.theme])}>
      {children}

      <div
        {...styleProps([
          'content',
          contentPositionClassname,
          invisible && `${contentPositionClassname}$invisible`,
        ])}
      >
        {content}
      </div>
    </div>
  );
};
