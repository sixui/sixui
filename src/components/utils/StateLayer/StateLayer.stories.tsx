import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import stylex from '@stylexjs/stylex';

import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { StateLayer, type IStateLayerProps } from './StateLayer';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

const meta = {
  component: StateLayer,
} satisfies Meta<typeof StateLayer>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStateLayerProps>;

const states: Array<IComponentPresentation<IStateLayerProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Dragged', props: { visualState: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const styles = stylex.create({
  container: {
    position: 'relative',
    boxSizing: 'content-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    width: 64,
    height: 64,
    outlineWidth: '1px',
    outlineColor: colorRolesVars.outline,
  },
  bounded: {
    borderRadius: shapeVars.corner$xl,
    outlineStyle: 'solid',
  },
  unbounded: {
    borderRadius: '50%',
    outlineStyle: 'dashed',
  },
  anchor: {
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    width: '1.5rem',
    height: '1.5rem',
    placeContent: 'center',
    placeItems: 'center',
    backgroundColor: colorRolesVars.primaryContainer,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorRolesVars.outline,
  },
});

export const Bounded: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(variantArgs) => (
        <div {...stylex.props(styles.container, styles.bounded)}>
          <StateLayer {...props} {...variantArgs} />
        </div>
      )}
      props={props}
      cols={states}
    />
  ),
  args: defaultArgs,
};

const unboundedStyles = stylex.create({
  host: {
    borderRadius: '50%',
    inset: 'none',
    width: '4rem',
    height: '4rem',
  },
});

const UnboundedComponent: React.FC<IStateLayerProps> = (props) => {
  const controlRef = useRef<HTMLDivElement>(null);

  return (
    <div {...stylex.props(styles.container, styles.unbounded)} ref={controlRef}>
      <div {...stylex.props(styles.anchor)}>
        <StateLayer {...props} styles={unboundedStyles} for={controlRef} />
      </div>
    </div>
  );
};

export const Unbounded: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(variantArgs) => (
        <UnboundedComponent {...props} {...variantArgs} />
      )}
      props={props}
      cols={states}
    />
  ),
  args: defaultArgs,
};

export default meta;
