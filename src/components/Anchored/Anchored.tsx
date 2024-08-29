import { forwardRef } from 'react';

import type { IAnchoredProps } from './Anchored.types';
import { anchoredStyles } from './Anchored.styles';
import { Base } from '../Base';
import { useStyles } from '~/hooks/useStyles';

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

    const { combineStyles, getStyles, globalStyles } = useStyles({
      componentName: 'Anchored',
      styles: [anchoredStyles, styles],
    });

    const invisible = invisibleProp || !content;

    return (
      <Base
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {children}

        <div
          {...getStyles(
            'content',
            `content$${overlap}$${verticalOrigin}$${horizontalOrigin}`,
            invisible &&
              `content$${overlap}$${verticalOrigin}$${horizontalOrigin}$invisible`,
          )}
        >
          {content}
        </div>
      </Base>
    );
  },
);
