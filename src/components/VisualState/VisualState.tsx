import stylex from '@stylexjs/stylex';

import type { IVisualStateProps } from './VisualState.types';
import { ButtonBase } from '../ButtonBase';
import { useVisualState } from './useVisualState';
import {
  visualStateFocusRingStyles,
  visualStateStyles,
} from './VisualState.styles';
import { Stack } from '../Stack';

export const VisualState: React.FC<IVisualStateProps> = (props) => {
  const { visualState: visualStateProp, disabled, children, ...other } = props;

  const { visualState, setRef } = useVisualState(visualStateProp, {
    disabled,
  });

  return (
    <ButtonBase
      {...other}
      visualState={visualState}
      sx={visualStateStyles.host}
      ref={setRef}
      innerStyles={{ focusRing: visualStateFocusRingStyles }}
      draggable={true}
      disabled={disabled}
    >
      <Stack horizontal gap={4}>
        <div {...stylex.props(visualStateStyles.states)}>
          <div
            {...stylex.props(
              visualState?.hovered
                ? visualStateStyles.on
                : visualStateStyles.off,
            )}
          >
            Hovered
          </div>
          <div
            {...stylex.props(
              visualState?.focused
                ? visualStateStyles.on
                : visualStateStyles.off,
            )}
          >
            Focused
          </div>
          <div
            {...stylex.props(
              visualState?.pressed
                ? visualStateStyles.on
                : visualStateStyles.off,
            )}
          >
            Pressed
          </div>
          <div
            {...stylex.props(
              visualState?.dragged
                ? visualStateStyles.on
                : visualStateStyles.off,
            )}
          >
            Dragged
          </div>
        </div>

        {children}
      </Stack>
    </ButtonBase>
  );
};
