import type { Meta, StoryObj } from '@storybook/react';

import type { IInteractionsState } from '~/hooks/useInteractions';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { StateLayer } from './StateLayer';
import { useStateLayer } from './useStateLayer';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

type IDemoProps = {
  staticInteractionState?: IInteractionsState;
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
    <Placeholder
      width='$24'
      height='$24'
      surface='$surface'
      corner='$md'
      outline='$xs'
      interactions={stateLayer.interactions}
    >
      <StateLayer context={stateLayer} />
    </Placeholder>
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
    <Placeholder
      width='$24'
      height='$24'
      surface='$surface'
      corner='$md'
      outline='$xs'
      outlineStyle='dashed'
      interactions={stateLayer.interactions}
    >
      <Placeholder
        as={StateLayer}
        width='$12'
        height='$12'
        surface='$transparent'
        corner='$sm'
        outline='$xs'
        context={stateLayer}
      />
    </Placeholder>
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
    <Placeholder
      width='$24'
      height='$24'
      surface='$surface'
      corner='$md'
      outline='$xs'
      interactions={stateLayer.interactions}
    >
      <StateLayer context={stateLayer} />

      <Placeholder
        width='$12'
        height='$12'
        surface='$surface'
        corner='$sm'
        outline='$xs'
        interactions={nestedStateLayer.interactions}
      >
        <StateLayer context={nestedStateLayer} />
      </Placeholder>
    </Placeholder>
  );
};

const NestedShowcase = makeComponentShowcase(NestedDemo);

export const Nested: IStory = {
  render: (props) => <NestedShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
