import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Button } from '@/components/atoms/Button';
import { Avatar } from '@/components/atoms/Avatar';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { Card, type ICardProps, type ICardOwnProps } from './Card';

// https://m3.material.io/components/cards
// https://github.com/material-components/material-web/blob/main/labs/card/demo/stories.ts

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  card: {
    width: 300,
  },
  avatar: {
    marginStart: 12,
  },
  media: {
    height: 200,
  },
});

const defaultArgs = {
  children: 'Default card content',
  sx: styles.card,
} satisfies Partial<ICardProps>;

const NonActionableContent: React.FC<{ headline?: string }> = ({
  headline,
}) => (
  <>
    <Card.Header
      start={
        <Avatar
          sx={styles.avatar}
          src='https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        />
      }
      headline='February 21, 2024'
      end={<IconButton icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />}
    >
      John Doe
    </Card.Header>
    <Card.Content>
      <Card.Title headline={headline ?? 'Headline'} />
      <Card.Media
        sx={styles.media}
        src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
      />
      <Card.Title
        subhead='Subhead'
        supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
      />
    </Card.Content>
    <Card.Actions>
      <Button
        variant='filled'
        onClick={(...args) => sbHandleEvent('click:primaryAction', args)}
      >
        Primary
      </Button>
      <Button
        variant='outlined'
        onClick={(...args) => sbHandleEvent('click:secondaryAction', args)}
      >
        Secondary
      </Button>
    </Card.Actions>
  </>
);

const NonActionableContentVariant: React.FC<{ headline?: string }> = ({
  headline,
}) => (
  <>
    <Card.Media
      sx={styles.media}
      src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
    />
    <Card.Content>
      <Card.Title
        headline={headline ?? 'Headline'}
        subhead='Subhead'
        supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
      />
    </Card.Content>
    <Card.Actions>
      <Button
        variant='filled'
        onClick={(...args) => sbHandleEvent('click:primaryAction', args)}
      >
        Primary
      </Button>
    </Card.Actions>
  </>
);

const ActionableContent: React.FC<{ headline?: string }> = ({ headline }) => (
  <>
    <Card.Media
      sx={styles.media}
      src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
    />
    <Card.Content>
      <Card.Title
        headline={headline ?? 'Headline'}
        subhead='Subhead'
        supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
      />
    </Card.Content>
    <Card.Actions>
      <Button
        variant='outlined'
        onClick={(...args) => sbHandleEvent('click:secondaryAction', args)}
      >
        Secondary
      </Button>
    </Card.Actions>
  </>
);

const states: Array<IComponentPresentation<ICardOwnProps>> = [
  { legend: 'Enabled' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Dragged', props: { visualState: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<ICardOwnProps>> = [
  {
    legend: 'Non-actionable',
    props: {
      children: <NonActionableContent />,
    },
  },
  {
    legend: 'Actionable',
    props: {
      onClick: (args) => sbHandleEvent('click:cardAction', args),
      children: <ActionableContent />,
    },
  },
];

const variants: Array<IComponentPresentation<ICardOwnProps>> = [
  {
    props: {
      variant: 'elevated',

      children: <NonActionableContent headline='Non-actionable' />,
    },
  },
  {
    props: {
      variant: 'outlined',
      children: <NonActionableContentVariant headline='Non-actionable' />,
    },
  },
  {
    props: {
      variant: 'filled',
      children: <ActionableContent headline='Actionable' />,
      onClick: () => sbHandleEvent('click:card'),
    },
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase component={Card} props={props} cols={variants} />
  ),
  args: defaultArgs,
};

export const Elevated: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Card}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Card}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Card}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
