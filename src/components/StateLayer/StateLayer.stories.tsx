import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import type { IInteractionState } from '~/hooks/useInteractions';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import { StateLayer } from './StateLayer';
import {
  stateLayerStoriesStyles as styles,
  stateLayerStoriesTheme as theme,
} from './StateLayer.stories.css';
import { useStateLayer } from './useStateLayer';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

type IDemoProps = {
  interactionState?: IInteractionState;
  disabled?: boolean;
};

// FIXME: handle nested

const meta = {} satisfies Meta<IDemoProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDemoProps>;

const states: Array<IComponentPresentation<IDemoProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { interactionState: { hovered: true } } },
  { legend: 'Pressed', props: { interactionState: { pressed: true } } },
  { legend: 'Dragged', props: { interactionState: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const BoundedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <div
      {...stateLayer.targetProps}
      className={clsx(theme, styles.container, styles.container$bounded)}
      ref={stateLayer.interactiveTargetRef}
    >
      <StateLayer context={stateLayer} />
    </div>
  );
};

export const Bounded: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <BoundedDemo {...props} />}
      props={props}
      cols={states}
    />
  ),
  args: defaultArgs,
};

const UnboundedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <div
      {...stateLayer.targetProps}
      className={clsx(theme, styles.container, styles.container$unbounded)}
      ref={stateLayer.interactiveTargetRef}
    >
      <StateLayer
        className={clsx(styles.container, styles.container$sm)}
        context={stateLayer}
      />
    </div>
  );
};

export const Unbounded: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <UnboundedDemo {...props} />}
      props={props}
      cols={states}
    />
  ),
  args: defaultArgs,
};

const NestedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);
  const nestedStateLayer = useStateLayer<HTMLDivElement>();

  return (
    <div
      {...stateLayer.targetProps}
      className={clsx(theme, styles.container, styles.container$bounded)}
      ref={stateLayer.interactiveTargetRef}
    >
      <StateLayer context={stateLayer} />

      <div
        {...nestedStateLayer.targetProps}
        className={clsx(
          theme,
          styles.container,
          styles.container$sm,
          styles.container$nested,
        )}
        ref={nestedStateLayer.interactiveTargetRef}
      >
        <StateLayer context={nestedStateLayer} />
      </div>
    </div>
  );
};

export const Nested: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <NestedDemo {...props} />}
      props={props}
    />
  ),
  args: defaultArgs,
};

export default meta;
