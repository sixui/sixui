import type { Meta, StoryObj } from '@storybook/react';

import type { IInteractions } from '~/hooks/useInteractions';
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
  interactions?: IInteractions;
  disabled?: boolean;
};

const meta = {} satisfies Meta<IDemoProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDemoProps>;

const states: Array<IComponentPresentation<IDemoProps>> = [
  { legend: 'Normal' },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Dragged', props: { interactions: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const BoundedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <Placeholder
      w='$24'
      h='$24'
      surface='$surface'
      corner='$md'
      outline='$xs'
      outlineStyle='solid'
      {...stateLayer.interactionsContext.triggerProps}
      ref={stateLayer.triggerRef}
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
      w='$24'
      h='$24'
      surface='$surface'
      corner='$md'
      outline='$xs'
      outlineStyle='dashed'
      {...stateLayer.interactionsContext.triggerProps}
      ref={stateLayer.triggerRef}
    >
      <Placeholder
        as={StateLayer}
        w='$12'
        h='$12'
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
      w='$24'
      h='$24'
      surface='$surface'
      corner='$md'
      outline='$xs'
      outlineStyle='solid'
      {...stateLayer.interactionsContext.triggerProps}
      ref={stateLayer.triggerRef}
    >
      <StateLayer context={stateLayer} />

      <Placeholder
        w='$12'
        h='$12'
        surface='$surface'
        corner='$sm'
        outline='$xs'
        outlineStyle='solid'
        {...nestedStateLayer.interactionsContext.triggerProps}
        ref={nestedStateLayer.triggerRef}
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
