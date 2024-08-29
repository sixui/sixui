import { forwardRef } from 'react';

import type { ITouchTargetProps } from './TouchTarget.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { touchTargetStyles } from './TouchTarget.styles';
import { useVisualState } from '../VisualState';
import { useMergeRefs } from '@floating-ui/react';

export const TouchTarget = forwardRef<HTMLDivElement, ITouchTargetProps>(
  function TouchTarget(props, forwardedRef) {
    const {
      styles,
      sx,
      visualState: visualStateProp,
      disabled,
      ...other
    } = props;

    const { visualState, setRef: setVisualStateRef } = useVisualState(
      visualStateProp,
      { disabled },
    );
    const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

    const { combineStyles, globalStyles } = useStyles({
      componentName: 'TouchTarget',
      styles: [touchTargetStyles, styles],
      visualState,
    });

    return (
      <Base
        {...other}
        sx={[
          globalStyles,
          combineStyles('host', visualState?.hovered && 'host$hovered'),
          sx,
        ]}
        ref={handleRef}
      />
    );
  },
);
