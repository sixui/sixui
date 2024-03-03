import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Card, type ICardProps } from './Card';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { IconButton } from '../IconButton/IconButton';

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
  media: {
    height: 200,
  },
});

const defaultArgs = {
  children: 'Default card content',
  sx: styles.card,
} satisfies Partial<ICardProps>;

const statesProps: IComponentPropsWithLegend<ICardProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', disabled: true },
];

const NonActionableContent: React.FC<{ headline?: string }> = ({
  headline,
}) => (
  <Fragment>
    <Card.Header
      start={
        <Avatar src='https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' />
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
        onClick={(args: React.MouseEvent<HTMLElement>) =>
          sbHandleEvent('click:primaryAction', args)
        }
      >
        Primary
      </Button>
      <Button
        variant='outlined'
        onClick={(args: React.MouseEvent<HTMLElement>) =>
          sbHandleEvent('click:secondaryAction', args)
        }
      >
        Secondary
      </Button>
    </Card.Actions>
  </Fragment>
);

const NonActionableContentVariant: React.FC<{ headline?: string }> = ({
  headline,
}) => (
  <Fragment>
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
        onClick={(args: React.MouseEvent<HTMLElement>) =>
          sbHandleEvent('click:primaryAction', args)
        }
      >
        Primary
      </Button>
    </Card.Actions>
  </Fragment>
);

const ActionableContent: React.FC<{ headline?: string }> = ({ headline }) => (
  <Fragment>
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
  </Fragment>
);

const rowsProps: IComponentPropsWithLegend<ICardProps> = [
  {
    $legend: 'Non-actionable',
    children: <NonActionableContent />,
  },
  {
    $legend: 'Actionable',
    onClick: (args) => sbHandleEvent('click:cardAction', args),
    children: <ActionableContent />,
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Card}
      props={props}
      colsProps={[
        {
          variant: 'elevated',
          children: <NonActionableContent headline='Non-actionable' />,
        },
        {
          variant: 'outlined',
          children: <NonActionableContentVariant headline='Non-actionable' />,
        },
        {
          variant: 'filled',
          children: (
            <ActionableContent headline='Actionable qskljd qlsjdlqskjd lqskjdlqsjd lqsjdlqsjd lqs dqs kjqslkdj qslkdj lqsj dlqs' />
          ),
          onClick: (args: React.MouseEvent<HTMLElement>) =>
            sbHandleEvent('click:card', args),
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Elevated: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Card}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
