import { forwardRef, useMemo } from 'react';

import type { IAnchoredProps } from './Anchored.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { anchoredStyles } from './Anchored.styles';

export const Anchored = forwardRef<HTMLDivElement, IAnchoredProps>(
  function Anchored(props, forwardedRef) {
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

    const { overridenStyles } = useComponentTheme('Anchored');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(anchoredStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
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
      <div {...sxf(overridenStyles, 'host', sx)} ref={forwardedRef} {...other}>
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
