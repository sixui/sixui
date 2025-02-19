import type { TransitionStatus } from 'react-transition-group';

import type { IMotionStatus } from './Motion.types';

export const resolveRtgStatus = (
  status: TransitionStatus | IMotionStatus,
): IMotionStatus => {
  switch (status) {
    case 'initial':
      return 'close';
    case 'entering':
      return 'open';
    case 'entered':
      return 'open';
    case 'exiting':
      return 'close';
    case 'exited':
      return 'close';
    case 'unmounted':
      return 'close';
  }

  return status;
};
