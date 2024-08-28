import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import type { IInteractionState } from '~/hooks/useInteractions';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import { Box } from '../Box';
import { StateLayer } from './StateLayer';
import {
  stateLayerStoriesStyles as styles,
  stateLayerStoriesTheme as theme,
} from './StateLayer.stories.css';
import { useStateLayer } from './useStateLayer';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

type IDemoProps = {
  staticInteractionState?: IInteractionState;
  disabled?: boolean;
};

const meta = {} satisfies Meta<IDemoProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDemoProps>;

const states: Array<IComponentPresentation<IDemoProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { staticInteractionState: { hovered: true } } },
  { legend: 'Pressed', props: { staticInteractionState: { pressed: true } } },
  { legend: 'Dragged', props: { staticInteractionState: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const BoundedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <Box
      className={clsx(
        theme,
        styles.root,
        styles.container,
        styles.container$bounded,
      )}
      interactions={stateLayer.interactions}
    >
      <StateLayer context={stateLayer} />
    </Box>
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
    <Box
      className={clsx(
        theme,
        styles.root,
        styles.container,
        styles.container$unbounded,
      )}
      interactions={stateLayer.interactions}
    >
      <StateLayer
        className={clsx(styles.container, styles.container$sm)}
        context={stateLayer}
      />
    </Box>
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
    <Box
      className={clsx(
        theme,
        styles.root,
        styles.container,
        styles.container$bounded,
      )}
      interactions={stateLayer.interactions}
    >
      <StateLayer context={stateLayer} />

      <Box
        className={clsx(
          styles.container,
          styles.container$sm,
          styles.container$nested,
        )}
        interactions={nestedStateLayer.interactions}
      >
        <StateLayer context={nestedStateLayer} />
      </Box>
    </Box>
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
