import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IAnchoredStyleKey } from './Anchored.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IAnchoredProps extends IContainer<IAnchoredStyleKey> {
  horizontalOrigin?: 'start' | 'end';
  verticalOrigin?: 'top' | 'bottom';
  overlap?: 'square' | 'circular';
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Anchored: React.FC<IAnchoredProps> = ({
  horizontalOrigin = 'end',
  verticalOrigin = 'top',
  overlap = 'square',
  children,
  content,
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

  return (
    <div {...styleProps(['host'], [props.theme])}>
      {children}

      <div
        {...styleProps([
          'content',
          horizontalOrigin === 'start'
            ? overlap === 'square'
              ? 'content$start$square'
              : 'content$start$circular'
            : overlap === 'square'
              ? 'content$end$square'
              : 'content$end$circular',
          verticalOrigin === 'top'
            ? overlap === 'square'
              ? 'content$top$square'
              : 'content$top$circular'
            : overlap === 'square'
              ? 'content$bottom$square'
              : 'content$bottom$circular',
        ])}
      >
        {content}
      </div>
    </div>
  );
};
