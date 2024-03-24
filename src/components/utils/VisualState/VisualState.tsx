import stylex from '@stylexjs/stylex';

import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { useForkRef } from '@/hooks/useForkRef';
import { ButtonBase } from '@/components/atoms/ButtonBase';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { componentVars as focusRingVars } from '@/themes/base/FocusRing/FocusRing.stylex';

export type IVisualStateProps = {
  visualState?: IVisualState;
  disabled?: boolean;
  children?: React.ReactNode;
};

const styles = stylex.create({
  host: {
    position: 'relative',
    boxSizing: 'content-box',
    padding: '1rem',
    minHeight: 96,
    minWidth: 96,
    outlineWidth: '1px',
    outlineColor: colorRolesVars.outline,
    borderRadius: shapeVars.corner$xl,
    outlineStyle: 'solid',
    color: colorRolesVars.onSurface,
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
    color: colorRolesVars.primary,
  },
  off: {
    color: colorRolesVars.surfacePlaceholder,
  },
});

const focusRingStyles = stylex.create({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: shapeVars.corner$xl,
  },
});

export const VisualState: React.FC<IVisualStateProps> = (props) => {
  const { visualState: visualStateProp, disabled, children } = props;

  const { visualState, ref } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref);

  return (
    <ButtonBase
      sx={styles.host}
      ref={handleRef}
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
