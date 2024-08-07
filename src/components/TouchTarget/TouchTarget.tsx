import { forwardRef } from 'react';

import type { ITouchTargetProps } from './TouchTarget.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { touchTargetStyles } from './TouchTarget.styles';

export const TouchTarget = forwardRef<HTMLDivElement, ITouchTargetProps>(
  function TouchTarget(props, forwardedRef) {
    const { styles, sx, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'TouchTarget',
      styles: [touchTargetStyles, styles],
    });

    return (
      <Base
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      />
    );
  },
);
