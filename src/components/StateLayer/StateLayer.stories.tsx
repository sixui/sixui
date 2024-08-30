import type { Meta, StoryObj } from '@storybook/react';
import cx from 'clsx';

import type { IInteractionState } from '~/hooks/useInteractions';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Box } from '../Box';
import { StateLayer } from './StateLayer';
import { stateLayerStoriesStyles } from './StateLayer.stories.css';
import { useStateLayer } from './useStateLayer';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

const { tokensClassName, classNames } = stateLayerStoriesStyles;

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
      className={cx(
        tokensClassName,
        classNames.container,
        classNames.container$bounded,
      )}
      interactions={stateLayer.interactions}
    >
      <StateLayer context={stateLayer} />
    </Box>
  );
};

const BoundedShowcase = makeComponentShowcase(BoundedDemo);

export const Bounded: IStory = {
  render: (props) => <BoundedShowcase props={props} cols={states} />,
  args: defaultArgs,
};

const UnboundedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <Box
      className={cx(
        tokensClassName,
        classNames.container,
        classNames.container$unbounded,
      )}
      interactions={stateLayer.interactions}
    >
      <StateLayer
        className={cx(classNames.container, classNames.container$sm)}
        context={stateLayer}
      />
    </Box>
  );
};

const UnboundedShowcase = makeComponentShowcase(UnboundedDemo);

export const Unbounded: IStory = {
  render: (props) => <UnboundedShowcase props={props} cols={states} />,
  args: defaultArgs,
};

const NestedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);
  const nestedStateLayer = useStateLayer<HTMLDivElement>();

  return (
    <Box
      className={cx(
        tokensClassName,
        classNames.container,
        classNames.container$bounded,
      )}
      interactions={stateLayer.interactions}
    >
      <StateLayer context={stateLayer} />

      <Box
        className={cx(
          classNames.container,
          classNames.container$sm,
          classNames.container$nested,
        )}
        interactions={nestedStateLayer.interactions}
      >
        <StateLayer context={nestedStateLayer} />
      </Box>
    </Box>
  );
};

const NestedShowcase = makeComponentShowcase(NestedDemo);

export const Nested: IStory = {
  render: (props) => <NestedShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
