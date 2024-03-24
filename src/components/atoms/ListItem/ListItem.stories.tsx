import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import {
  ListItem,
  type IListItemProps,
  type IListItemOwnProps,
} from './ListItem';

// https://m3.material.io/components/items/overview
// https://material-web.dev/components/item/
// https://github.com/material-components/material-web/blob/main/labs/item/demo/stories.ts

const meta = {
  component: ListItem,
} satisfies Meta<typeof ListItem>;

type IStory = StoryObj<typeof meta>;

const listItemStyles = stylex.create({
  host: {
    width: '180px',
  },
});

const defaultArgs = {
  children: undefined,
  styles: listItemStyles,
} satisfies Partial<IListItemProps>;

const states: Array<IComponentPresentation<IListItemOwnProps>> = [
  { legend: 'Enabled', props: { children: 'Enabled' } },
  {
    legend: 'Focused',
    props: { children: 'Focused', visualState: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { children: 'Hovered', visualState: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { children: 'Pressed', visualState: { pressed: true } },
  },
  { legend: 'Selected', props: { children: 'Selected', selected: true } },
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<IListItemOwnProps>> = [
  { legend: 'Text' },
  {
    legend: 'Button',
    props: { onClick: (...args) => void sbHandleEvent('click', args) },
  },
  { legend: 'Link', props: { href: '#' } },
  {
    legend: 'Link with Icons',
    props: {
      href: '#',
      leadingIcon: <FontAwesomeIcon icon={faCalendarDays} />,
      trailingIcon: <FontAwesomeIcon icon={faChevronRight} />,
    },
  },
];

const variants: Array<IComponentPresentation<IListItemOwnProps>> = [
  {
    props: { children: 'One line item' },
  },
  {
    props: {
      children: 'With Icons',
      start: <FontAwesomeIcon icon={faCalendarDays} />,
      end: <FontAwesomeIcon icon={faChevronRight} />,
    },
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase component={ListItem} props={props} cols={variants} />
  ),
  args: {
    ...defaultArgs,
    type: 'link',
  },
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ListItem}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: defaultArgs as IListItemProps,
};

export default meta;
