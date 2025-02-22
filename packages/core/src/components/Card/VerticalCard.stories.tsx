import type { Meta, StoryObj } from '@storybook/react';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICardProps } from './Card.types';
import { Avatar } from '~/components/Avatar';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IconButton } from '~/components/IconButton';
import { List } from '~/components/List';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Card } from './Card';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const MEDIA_URL =
  'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600';
const AVATAR_URL =
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const defaultArgs = {
  w: '$72',
  onClick: (...args) => sbHandleEvent('card:onClick', args),
} satisfies Partial<ICardProps>;

const states: Array<IComponentPresentation<ICardProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Focused',
    props: { interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { interactions: { pressed: true } },
  },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<ICardProps>> = [
  {
    legend: 'Example A',
    props: {
      children: (
        <>
          <List.Item
            leading={<Avatar src={AVATAR_URL} />}
            supportingText="February 21, 2024"
            trailing={
              <IconButton
                icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                onClick={(...args) => sbHandleEvent('menu:onClick', args)}
              />
            }
            pt="$2"
          >
            John Doe
          </List.Item>
          <Card.Content>
            <Card.Title headline="Headline" />
            <Card.Media src={MEDIA_URL} h="$48" />
            <Card.Title
              subhead="Subhead"
              supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
            />
          </Card.Content>
          <Card.Actions>
            <Button
              variant="filled"
              onClick={(...args) => sbHandleEvent('action:onClick', args)}
            >
              Action
            </Button>
          </Card.Actions>
        </>
      ),
    },
  },
  {
    legend: 'Example B',
    props: {
      children: (
        <>
          <Card.Media src={MEDIA_URL} h="$48" />
          <Card.Content>
            <Card.Title
              headline="Headline"
              subhead="Subhead"
              supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
            />
          </Card.Content>
          <Card.Actions>
            <Button
              variant="filled"
              onClick={(...args) => sbHandleEvent('action:onClick', args)}
            >
              Action
            </Button>
          </Card.Actions>
        </>
      ),
    },
  },
];

const CardShowcase = componentShowcaseFactory(Card);

export const Filled: IStory = {
  render: (props) => <CardShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Elevated: IStory = {
  render: (props) => <CardShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Outlined: IStory = {
  render: (props) => <CardShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
