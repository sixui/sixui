import type { Meta, StoryObj } from '@storybook/react';

import type { IMenuListProps } from './MenuList.types';
import { makeComponentShowcase } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ListItem } from '../../ListItem';
import { Placeholder } from '../../Placeholder';
import { MenuDivider } from '../MenuDivider';
import { MenuList } from './MenuList';

const meta = {
  component: MenuList,
} satisfies Meta<typeof MenuList>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$48',
  children: (
    <>
      <ListItem onClick={(...args) => sbHandleEvent('onClick', args)}>
        Apple
      </ListItem>
      <ListItem onClick={(...args) => sbHandleEvent('onClick', args)}>
        Banana
      </ListItem>
      <ListItem onClick={(...args) => sbHandleEvent('onClick', args)}>
        This is a very long and unexpected item
      </ListItem>
      <MenuDivider />
      <ListItem
        onClick={(...args) => sbHandleEvent('onClick', args)}
        lineClamp={1}
      >
        This item will never wrap
      </ListItem>
    </>
  ),
} satisfies Partial<IMenuListProps>;

const MenuListShowcase = makeComponentShowcase(MenuList);

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
