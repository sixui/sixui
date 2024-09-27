import type { Meta, StoryObj } from '@storybook/react';
import {
  faCalendarDays,
  faCheck,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSequence } from '@olivierpascal/helpers';

import type { IListItemProps } from '../ListItem';
import type { IListProps } from './List.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { Avatar } from '../Avatar';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { ListItem } from '../ListItem';
import { Paper } from '../Paper';
import { Placeholder } from '../Placeholder';
import { List } from './List';

// https://m3.material.io/components/lists/overview
// https://material-web.dev/components/list/
// https://material-web.dev/components/list/stories/
// https://github.com/material-components/material-web/blob/main/list/demo/stories.ts

const meta = {
  component: List,
} satisfies Meta<typeof List>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  header: <Placeholder corner="$none" label="Header" />,
  footer: <Placeholder corner="$none" label="Footer" />,
} satisfies Partial<IListProps>;

const ListDemo: React.FC<IListProps> = (props) => (
  <Paper outline="$xs" outlineStyle="dashed">
    <div style={{ overflowY: 'auto' }}>
      <List {...props} />
    </div>
  </Paper>
);

const renderListItems = (props?: IListItemProps, count = 4): React.ReactNode =>
  createSequence(count, 1).map((initials, index) => (
    <ListItem key={index} leading={<Avatar>{initials}</Avatar>} {...props}>
      Label
    </ListItem>
  ));

const ListDemoShowcase = componentShowcaseFactory(ListDemo);

export const Scales: IStory = {
  render: (props) => (
    <ListDemoShowcase
      verticalAlign="start"
      cols={[
        {
          legend: 'Extra small',
          props: {
            children: renderListItems(),
            scale: 'xs',
          },
        },
        {
          legend: 'Small',
          props: {
            children: renderListItems(),
            scale: 'sm',
          },
        },
        {
          legend: 'Medium',
          props: {
            children: renderListItems(),
            scale: 'md',
          },
        },
        {
          legend: 'Large',
          props: {
            children: renderListItems({
              supportingText: 'Supporting text',
            }),
            scale: 'lg',
          },
        },
        {
          legend: 'Extra large',
          props: {
            children: renderListItems({
              supportingText:
                'Supporting text that is long enough to fill up multiple lines',
            }),
            scale: 'xl',
          },
        },
      ]}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    maw: px(280),
  },
};

export const Densities: IStory = {
  render: (props) => (
    <ListDemoShowcase
      verticalAlign="start"
      cols={[-6, -4, -2, 0, 2].map((density) => ({
        legend: String(density),
        props: {
          children: renderListItems(),
          density,
        },
      }))}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    maw: px(280),
  },
};

export const Grid: IStory = {
  render: (props) => <ListDemoShowcase verticalAlign="start" props={props} />,
  args: {
    ...defaultArgs,
    children: renderListItems({ supportingText: 'Supporting text' }, 8),
    cols: 3,
  },
};

export const Configurations: IStory = {
  render: (props) => (
    <ListDemoShowcase
      props={props}
      cols={[
        {
          props: {
            children: (
              <>
                <ListItem>Basic item</ListItem>
                <ListItem leadingIcon={<FontAwesomeIcon icon={faCheck} />}>
                  Item with leading icon
                </ListItem>
                <ListItem
                  leadingIcon={<FontAwesomeIcon icon={faCheck} />}
                  supportingText="Supporting text that is long enough to fill up multiple lines"
                >
                  Item with leading icon
                </ListItem>
                <ListItem trailingIcon={<FontAwesomeIcon icon={faLink} />}>
                  Item with trailing icon
                </ListItem>
                <ListItem leading={<Avatar>A</Avatar>}>
                  Item with leading element
                </ListItem>
                <ListItem
                  leading={
                    <Avatar src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  }
                  supportingText="Supporting text that is long enough to fill up multiple lines"
                >
                  Item with leading element
                </ListItem>
                <ListItem leadingImage="https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&h=168&w=168">
                  Item with leading image
                </ListItem>
                <ListItem
                  leadingVideo={[
                    {
                      type: 'video/webm',
                      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
                    },
                    {
                      type: 'video/mp4',
                      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
                    },
                  ]}
                >
                  Item with leading video
                </ListItem>
              </>
            ),
          },
        },
        {
          props: {
            children: (
              <>
                {/* FIXME: <ListItem trailing={<Checkbox checked />}>
                  Item with trailing element
                </ListItem> */}
                <ListItem overline="Overline">Item with overline</ListItem>
                <ListItem supportingText="Supporting text">
                  Item with supporting text
                </ListItem>
                <ListItem trailingSupportingText="100+">
                  Item with trailing supporting text
                </ListItem>
                <ListItem selected>Selected item</ListItem>
                <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
                  Interactive item
                </ListItem>
                <ListItem
                  leadingIcon={<FontAwesomeIcon icon={faCalendarDays} />}
                  disabled
                >
                  Disabled item
                </ListItem>
              </>
            ),
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    maw: px(280),
  },
};

export default meta;
