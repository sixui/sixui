import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import stylex from '@stylexjs/stylex';

import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import type { IStateLayerProps } from './StateLayer.types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { StateLayer } from './StateLayer';

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
    width: `calc(96px * ${scaleTokens.scale})`,
    height: `calc(96px * ${scaleTokens.scale})`,
    outlineWidth: outlineTokens.width$xs,
    outlineColor: colorSchemeTokens.outline,
  },
  container$inner: {
    position: 'absolute',
    width: `calc(48px * ${scaleTokens.scale})`,
    height: `calc(48px * ${scaleTokens.scale})`,
    borderRadius: shapeTokens.corner$lg,
    outlineStyle: 'solid',
    inset: '50%',
    transform: 'translate(-50%, -50%)',
  },
  container$bounded: {
    borderRadius: shapeTokens.corner$xl,
    outlineStyle: 'solid',
  },
  container$unbounded: {
    borderRadius: '50%',
    outlineStyle: 'dashed',
  },
  overlappingContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  anchor: {
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    width: `calc(24px * ${scaleTokens.scale})`,
    height: `calc(24px * ${scaleTokens.scale})`,
    placeContent: 'center',
    placeItems: 'center',
    backgroundColor: colorSchemeTokens.primaryContainer,
    borderWidth: outlineTokens.width$xs,
    borderStyle: 'solid',
    borderColor: colorSchemeTokens.outline,
  },
});

export const Bounded: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(variantArgs) => (
        <div {...stylex.props(styles.container, styles.container$bounded)}>
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
    width: `calc(64px * ${scaleTokens.scale})`,
    height: `calc(64px * ${scaleTokens.scale})`,
  },
});

const UnboundedComponent: React.FC<IStateLayerProps> = (props) => {
  const controlRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...stylex.props(styles.container, styles.container$unbounded)}
      ref={controlRef}
    >
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

export const Overlapping: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(variantArgs) => (
        <div {...stylex.props(styles.overlappingContainer)}>
          <div {...stylex.props(styles.container, styles.container$bounded)}>
            <StateLayer {...props} {...variantArgs} />
          </div>
          <div {...stylex.props(styles.container, styles.container$inner)}>
            <StateLayer {...props} {...variantArgs} />
          </div>
        </div>
      )}
      props={props}
    />
  ),
  args: defaultArgs,
};

export default meta;
