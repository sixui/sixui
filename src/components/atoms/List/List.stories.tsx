import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCheck,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

import type { IListItemProps } from '@/components/atoms/ListItem';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { Avatar } from '@/components/atoms/Avatar';
import { Checkbox } from '@/components/atoms/Checkbox';
import { List, type IListProps } from './List';

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
    outlineWidth: '1px',
    outlineStyle: 'dashed',
    outlineColor: colorRolesVars.outlineVariant,
  },
  host$fixedSize: {
    width: 280,
    height: 280,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<IListProps>;

const renderListItems = (props?: IListItemProps): React.ReactNode =>
  ['A', 'B', 'C', 'D'].map((initials, index) => (
    <List.Item key={index} leading={<Avatar>{initials}</Avatar>} {...props}>
      Headline
    </List.Item>
  ));

export const Sizes: IStory = {
  render: (args) => (
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
      props={args}
    />
  ),
  args: {
    ...defaultArgs,
    sx: [styles.host, styles.host$fixedSize],
  },
};

export const Configuration: IStory = {
  render: (args) => (
    <ComponentShowcase
      component={(args) => (
        <List {...args}>
          <List.Item>Basic item</List.Item>
          <List.Item leadingIcon={<FontAwesomeIcon icon={faCheck} />}>
            Item with leading icon
          </List.Item>
          <List.Item
            leadingIcon={<FontAwesomeIcon icon={faCheck} />}
            supportingText='Supporting text that is long enough to fill up multiple lines'
          >
            Item with leading icon
          </List.Item>
          <List.Item trailingIcon={<FontAwesomeIcon icon={faLink} />}>
            Item with trailing icon
          </List.Item>
          <List.Item leading={<Avatar>A</Avatar>}>
            Item with leading element
          </List.Item>
          <List.Item
            leading={
              <Avatar src='https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' />
            }
            supportingText='Supporting text that is long enough to fill up multiple lines'
          >
            Item with leading element
          </List.Item>
          <List.Item leadingImage='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&h=168&w=168'>
            Item with leading image
          </List.Item>
          <List.Item
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
          </List.Item>
          <List.Item trailing={<Checkbox checked />}>
            Item with trailing element
          </List.Item>
          <List.Item overline='Overline'>Item with overline</List.Item>
          <List.Item supportingText='Supporting text'>
            Item with supporting text
          </List.Item>
          <List.Item trailingSupportingText='100+'>
            Item with trailing supporting text
          </List.Item>
          <List.Item selected>Selected item</List.Item>
          <List.Item onClick={(...args) => sbHandleEvent('click', args)}>
            Interactive item
          </List.Item>
          <List.Divider />
          <List.Item
            leadingIcon={<FontAwesomeIcon icon={faCalendarDays} />}
            disabled
          >
            Disabled item
          </List.Item>
        </List>
      )}
      props={args}
    />
  ),
  args: defaultArgs,
};

export default meta;
