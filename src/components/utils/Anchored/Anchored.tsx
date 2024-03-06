import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
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

export const Anchored = forwardRef<HTMLDivElement, IAnchoredProps>(
  function Anchored(props, ref) {
    const {
      styles,
      sx,
      horizontalOrigin = 'right',
      verticalOrigin = 'top',
      overlap = 'rectangular',
      children,
      content,
      invisible: invisibleProp,
      ...other
    } = props;

    const { theme } = useComponentTheme('Anchored');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<IAnchoredStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    const invisible = invisibleProp || !content;

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
      <div {...sxf('host', sx)} ref={ref} {...other}>
        {children}

        <div
          {...sxf(
            'content',
            contentPositionClassname,
            invisible && `${contentPositionClassname}$invisible`,
          )}
        >
          {content}
        </div>
      </div>
    );
  },
);
