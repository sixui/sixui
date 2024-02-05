import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IAnchoredStyleKey } from './Anchored.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IAnchoredProps extends IContainer<IAnchoredStyleKey> {
  verticalOrigin?: 'top' | 'bottom';
  horizontalOrigin?: 'left' | 'right';
  overlap?: 'rectangular' | 'circular';
  children: React.ReactNode;
  content: React.ReactNode;
  invisible?: boolean;
}

export const Anchored: React.FC<IAnchoredProps> = ({
  horizontalOrigin = 'right',
  verticalOrigin = 'top',
  overlap = 'rectangular',
  children,
  content,
  invisible,
  ...props
}) => {
  const theme = useComponentTheme('Anchored');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IAnchoredStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

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
    <div {...styleProps(['host'], [props.theme])}>
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
