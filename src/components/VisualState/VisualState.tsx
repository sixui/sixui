import stylex from '@stylexjs/stylex';

import type { IVisualStateProps } from './VisualState.types';
import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { ButtonBase } from '@/components/ButtonBase';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { focusRingTokens } from '@/components/FocusRing/FocusRing.stylex';
import { useVisualState } from './useVisualState';

const styles = stylex.create({
  host: {
    position: 'relative',
    boxSizing: 'content-box',
    padding: '1rem',
    minHeight: 96,
    minWidth: 96,
    outlineWidth: '1px',
    outlineColor: colorRolesTokens.outline,
    borderRadius: shapeTokens.corner$xl,
    outlineStyle: 'solid',
    color: colorRolesTokens.onSurface,
    justifyContent: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  },
  states: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  on: {
    color: colorRolesTokens.primary,
  },
  off: {
    color: colorRolesTokens.surfacePlaceholder,
  },
});

const focusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: shapeTokens.corner$xl,
  },
});

export const VisualState: React.FC<IVisualStateProps> = (props) => {
  const { visualState: visualStateProp, disabled, children } = props;

  const { visualState, setRef } = useVisualState(visualStateProp, {
    disabled,
  });

  return (
    <ButtonBase
      sx={styles.host}
      ref={setRef}
      innerStyles={{ focusRing: focusRingStyles }}
      draggable={true}
      disabled={disabled}
    >
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.states)}>
          <div {...stylex.props(visualState?.hovered ? styles.on : styles.off)}>
            Hovered
          </div>
          <div {...stylex.props(visualState?.focused ? styles.on : styles.off)}>
            Focused
          </div>
          <div {...stylex.props(visualState?.pressed ? styles.on : styles.off)}>
            Pressed
          </div>
          <div {...stylex.props(visualState?.dragged ? styles.on : styles.off)}>
            Dragged
          </div>
        </div>

        {children}
      </div>
    </ButtonBase>
  );
};
