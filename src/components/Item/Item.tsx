import { forwardRef, useMemo } from 'react';

import type { IItemProps } from './Item.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { commonStyles } from '~/helpers/commonStyles';
import { itemStyles } from './Item.styles';
import { itemTheme } from './Item.stylex';

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

    const componentTheme = useComponentTheme('Item');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(itemStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...other}
        {...sxf(itemTheme, componentTheme.overridenStyles, 'host', sx)}
        ref={forwardedRef}
      >
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
