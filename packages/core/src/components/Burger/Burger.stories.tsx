import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IBurgerProps } from './Burger.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { useToggle } from '~/hooks';
import { Burger } from './Burger';

const meta = {
  component: Burger,
} satisfies Meta<typeof Burger>;

type IStory = StoryObj<typeof meta>;

const states: Array<IComponentPresentation<IBurgerProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IBurgerProps>> = [
  { legend: 'Closed' },
  { legend: 'Opened', props: { opened: true } },
];

const BurgerShowcase = componentShowcaseFactory(Burger);

export const Standard: IStory = {
  render: (props) => <BurgerShowcase props={props} cols={states} rows={rows} />,
};

const BurgerDemo: React.FC<IBurgerProps> = (props) => {
  const [opened, toggleOpened] = useToggle([false, true]);

  return (
    <Burger
      {...props}
      opened={opened}
      onClick={() => {
        toggleOpened();
      }}
    />
  );
};

export const Interactive: IStory = {
  render: (props) => <BurgerDemo {...props} />,
};

export default meta;
