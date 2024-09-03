import { forwardRef } from 'react';

import type { IItemProps } from './Item.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { commonStyles } from '~/helpers/commonStyles';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { itemStyles } from './Item.styles';
import { itemTheme } from './Item.stylex';

// https://github.com/material-components/material-web/blob/main/labs/item/item.ts

export const Item = createPolymorphicComponent<'div', IItemProps>(
  forwardRef<HTMLDivElement, IItemProps>(function Item(props, forwardedRef) {
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

    const { combineStyles, getStyles, globalStyles } = useStyles({
      componentName: 'Item',
      styles: [itemStyles, styles],
    });

    return (
      <Base
        {...other}
        sx={[itemTheme, globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {container ? <div {...getStyles('container')}>{container}</div> : null}

        {start ? (
          <div {...getStyles('nonText', 'nonText$start')}>{start}</div>
        ) : null}

        <div {...getStyles('content')}>
          <div
            {...getStyles(
              'text',
              maxLines ? commonStyles.truncateLines(maxLines) : undefined,
            )}
          >
            {overline ? <div {...getStyles('overline')}>{overline}</div> : null}
            <div {...getStyles('headline')}>{children}</div>
            {supportingText ? (
              <div {...getStyles('supportingText')}>{supportingText}</div>
            ) : null}
          </div>
        </div>

        {trailingSupportingText ? (
          <div {...getStyles('nonText', 'nonText$trailingSupportingText')}>
            {trailingSupportingText}
          </div>
        ) : null}

        {end ? <div {...getStyles('nonText', 'nonText$end')}>{end}</div> : null}
      </Base>
    );
  }),
);
