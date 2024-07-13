import { forwardRef, useMemo } from 'react';

import type { IItemStyleKey, IItemStyleVarKey } from './Item.styledefs';
import type { IItemProps } from './ItemProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { commonStyles } from '@/helpers/commonStyles';

// https://github.com/material-components/material-web/blob/main/labs/item/item.ts

export const Item = forwardRef<HTMLDivElement, IItemProps>(
  function Item(props, forwardedRef) {
    const {
      styles,
      sx,
      container,
      start,
      overline,
      children,
      supportingText,
      trailingSupportingText,
      end,
      maxLines,
      ...other
    } = props;

    const { theme } = useComponentThemeOld('Item');
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
      <div {...sxf('host', theme.vars, sx)} ref={forwardedRef} {...other}>
        {container ? <div {...sxf('container')}>{container}</div> : null}

        {start ? <div {...sxf('nonText', 'nonText$start')}>{start}</div> : null}

        <div {...sxf('content')}>
          <div
            {...sxf(
              'text',
              maxLines ? commonStyles.truncateLines(maxLines) : undefined,
            )}
          >
            {overline ? <div {...sxf('overline')}>{overline}</div> : null}
            <div {...sxf('headline')}>{children}</div>
            {supportingText ? (
              <div {...sxf('supportingText')}>{supportingText}</div>
            ) : null}
          </div>
        </div>

        {trailingSupportingText ? (
          <div {...sxf('nonText', 'nonText$trailingSupportingText')}>
            {trailingSupportingText}
          </div>
        ) : null}

        {end ? <div {...sxf('nonText', 'nonText$end')}>{end}</div> : null}
      </div>
    );
  },
);
