import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IItemStyleKey, IItemStyleVarKey } from './Item.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

// https://github.com/material-components/material-web/blob/main/labs/item/item.ts

export type IItemProps = IContainerProps<IItemStyleKey> & {
  container?: React.ReactNode;
  start?: React.ReactNode;
  overline?: React.ReactNode;
  children?: React.ReactNode;
  headline?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  end?: React.ReactNode;
};

export const Item = forwardRef<HTMLDivElement, IItemProps>(
  function Item(props, ref) {
    const {
      styles,
      sx,
      container,
      start,
      overline,
      children,
      headline,
      supportingText,
      trailingSupportingText,
      end,
      ...other
    } = props;

    const { theme } = useComponentTheme('Item');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IItemStyleKey, IItemStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
        {container ? <div {...sxf('container')}>{container}</div> : null}

        {start ? (
          <div {...sxf('nonText')}>
            <div {...sxf('center', 'start')}>{start}</div>
          </div>
        ) : null}

        <div {...sxf('content')}>
          <div {...sxf('text')}>
            {overline ? <div {...sxf('overline')}>{overline}</div> : null}
            <div {...sxf('label')}>{children}</div>
            {headline ? <div {...sxf('headline')}>{headline}</div> : null}
            {supportingText ? (
              <div {...sxf('supportingText')}>{supportingText}</div>
            ) : null}
          </div>

          {trailingSupportingText ? (
            <div {...sxf('nonText')}>
              <div {...sxf('center', 'trailingSupportingText')}>
                {trailingSupportingText}
              </div>
            </div>
          ) : null}
        </div>

        {end ? (
          <div {...sxf('nonText')}>
            <div {...sxf('center', 'end')}>{end}</div>
          </div>
        ) : null}
      </div>
    );
  },
);
