import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IMenuListProps } from './MenuList.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { List } from '~/components/List';
import { Placeholder } from '~/components/Placeholder';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { MenuList } from './MenuList';

const meta = {
  component: MenuList,
} satisfies Meta<typeof MenuList>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '160px',
  children: (
    <>
      <List.Item onClick={(...args) => sbHandleEvent('onClick', args)}>
        Apple
      </List.Item>
      <List.Item onClick={(...args) => sbHandleEvent('onClick', args)}>
        Banana
      </List.Item>
      <List.Item onClick={(...args) => sbHandleEvent('onClick', args)}>
        This is a very long and unexpected item
      </List.Item>
      <List.Divider />
      <List.Item
        onClick={(...args) => sbHandleEvent('onClick', args)}
        lineClamp={1}
      >
        This item will never wrap
      </List.Item>
    </>
  ),
} satisfies Partial<IMenuListProps>;

const MenuListShowcase = componentShowcaseFactory(MenuList);

export const Scales: IStory = {
  render: (props) => (
    <MenuListShowcase
      props={props}
      verticalAlign="start"
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <MenuListShowcase
      verticalAlign="start"
      cols={[-6, -4, -2, 0, 2].map((density) => ({
        legend: String(density),
        props: {
          density,
        },
      }))}
      props={props}
    />
  ),
  args: defaultArgs,
};

export const AutoWidth: IStory = {
  render: (props) => <MenuList {...props} />,
  args: {
    ...defaultArgs,
    w: 'fit-content',
  },
};

export const WithHeaderAndFooter: IStory = {
  render: (props) => <MenuList {...props} />,
  args: {
    ...defaultArgs,
    header: <Placeholder label="Header" />,
    footer: <Placeholder label="Footer" />,
  },
};

export default meta;
