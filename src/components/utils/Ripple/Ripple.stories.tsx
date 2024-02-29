import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import stylex from '@stylexjs/stylex';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Ripple, type IRippleProps } from './Ripple';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

const meta = {
  component: Ripple,
} satisfies Meta<typeof Ripple>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IRippleProps>;

const statesProps: IComponentPropsWithLegend<IRippleProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', disabled: true },
];

const styles = stylex.create({
  container: {
    position: 'relative',
    boxSizing: 'content-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    height: '4rem',
    width: '4rem',
    outlineWidth: '1px',
    outlineColor: colorRolesVars.outline,
  },
  bounded: {
    borderRadius: '1.5rem',
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
          <Ripple {...props} {...variantArgs} />
        </div>
      )}
      props={props}
      colsProps={statesProps}
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

const UnboundedComponent: React.FC<IRippleProps> = (props) => {
  const controlRef = useRef<HTMLDivElement>(null);

  return (
    <div {...stylex.props(styles.container, styles.unbounded)} ref={controlRef}>
      <div {...stylex.props(styles.anchor)}>
        <Ripple {...props} styles={unboundedStyles} for={controlRef} />
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
      colsProps={statesProps}
    />
  ),
  args: defaultArgs,
};

export default meta;
