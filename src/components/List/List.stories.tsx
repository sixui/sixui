import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCheck,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { createSequence } from '@olivierpascal/helpers';

import type { IListProps } from './List.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { ComponentShowcase } from '../ComponentShowcase';
import { ListItem, type IListItemProps } from '../ListItem';
import { Avatar } from '../Avatar';
import { Checkbox } from '../Checkbox';
import { List } from './List';

// https://m3.material.io/components/lists/overview
// https://material-web.dev/components/list/
// https://material-web.dev/components/list/stories/
// https://github.com/material-components/material-web/blob/main/list/demo/stories.ts

const meta = {
  component: List,
} satisfies Meta<typeof List>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    outlineWidth: outlineTokens.width$xs,
    outlineStyle: 'dashed',
    outlineColor: colorSchemeTokens.outlineVariant,
  },
  host$fixedSize: {
    width: `calc(280px * ${scaleTokens.scale})`,
    height: `calc(280px * ${scaleTokens.scale})`,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<IListProps>;

const renderListItems = (props?: IListItemProps, count = 4): React.ReactNode =>
  createSequence(count, 1).map((initials, index) => (
    <ListItem key={index} leading={<Avatar>{initials}</Avatar>} {...props}>
      Headline
    </ListItem>
  ));

export const Sizes: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <List {...props} />}
      verticalAlign='start'
      cols={[
        {
          legend: 'Small (sm)',
          props: {
            children: renderListItems(),
            size: 'sm',
          },
        },
        {
          legend: 'Medium (md)',
          props: {
            children: renderListItems(),
            size: 'md',
          },
        },
        {
          legend: 'Large (lg)',
          props: {
            children: renderListItems({
              supportingText: 'Supporting text',
            }),
            size: 'lg',
          },
        },
        {
          legend: 'Extra large (xl)',
          props: {
            children: renderListItems({
              supportingText:
                'Supporting text that is long enough to fill up multiple lines',
            }),
            size: 'xl',
          },
        },
      ]}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    sx: [styles.host, styles.host$fixedSize],
  },
};

export const Grid: IStory = {
  render: (props) => <List {...props} />,
  args: {
    ...defaultArgs,
    cols: 3,
    children: renderListItems(
      {
        supportingText: 'Supporting text',
      },
      8,
    ),
  },
};

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(args) => (
        <List {...args}>
          <ListItem>Basic item</ListItem>
          <ListItem leadingIcon={<FontAwesomeIcon icon={faCheck} />}>
            Item with leading icon
          </ListItem>
          <ListItem
            leadingIcon={<FontAwesomeIcon icon={faCheck} />}
            supportingText='Supporting text that is long enough to fill up multiple lines'
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
              <Avatar src='https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' />
            }
            supportingText='Supporting text that is long enough to fill up multiple lines'
          >
            Item with leading element
          </ListItem>
          <ListItem leadingImage='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&h=168&w=168'>
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
          <ListItem trailing={<Checkbox checked />}>
            Item with trailing element
          </ListItem>
          <ListItem overline='Overline'>Item with overline</ListItem>
          <ListItem supportingText='Supporting text'>
            Item with supporting text
          </ListItem>
          <ListItem trailingSupportingText='100+'>
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
        </List>
      )}
      props={props}
    />
  ),
  args: defaultArgs,
};

export default meta;
