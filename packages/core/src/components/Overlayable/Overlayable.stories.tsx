import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IOverlayableProps } from './Overlayable.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Placeholder } from '~/components/Placeholder';
import { Overlayable } from './Overlayable';

const meta = {
  component: Overlayable,
} satisfies Meta<typeof Overlayable>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder label="Content" w="96px" h="96px" shape="$md" />,
  overlay: <IndeterminateCircularProgressIndicator />,
} satisfies Partial<IOverlayableProps>;

const states: Array<IComponentPresentation<IOverlayableProps>> = [
  { legend: 'Normal' },
  { legend: 'Visible overlay', props: { visible: true } },
];

const OverlayableShowcase = componentShowcaseFactory(Overlayable);

export const Basic: IStory = {
  render: (props) => <OverlayableShowcase props={props} cols={states} />,
  args: defaultArgs,
};

export default meta;
