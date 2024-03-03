import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Card, type ICardProps } from './Card';
import { Button } from '../Button';

// https://m3.material.io/components/cards
// https://github.com/material-components/material-web/blob/main/labs/card/demo/stories.ts

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  card: {
    flexDirection: 'row',
    width: 600,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  innerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  media: {
    width: 140,
  },
  mediaInner: {
    height: '100%',
    aspectRatio: '1',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 0,
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
  { $legend: 'Dragged', visualState: { dragged: true } },
  { $legend: 'Disabled', disabled: true },
];

const NonActionableContent: React.FC<{ headline?: string }> = ({
  headline,
}) => (
  <>
    <Card.Content sx={styles.content}>
      <Card.Media
        sx={styles.mediaInner}
        src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
      />
      <div {...stylex.props(styles.innerContent)}>
        <Card.Title
          headline={headline ?? 'Headline'}
          supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
        />
        <Card.Actions sx={styles.actions}>
          <Button
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
      </div>
    </Card.Content>
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
    <Card.Content sx={styles.content}>
      <div {...stylex.props(styles.innerContent)}>
        <Card.Title
          headline={headline ?? 'Headline'}
          supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
        />
        <Card.Actions sx={styles.actions}>
          <Button
            onClick={(args: React.MouseEvent<HTMLElement>) =>
              sbHandleEvent('click:primaryAction', args)
            }
          >
            Primary
          </Button>
        </Card.Actions>
      </div>
    </Card.Content>
  </>
);

const ActionableContent: React.FC<{ headline?: string }> = ({ headline }) => (
  <>
    <Card.Media
      sx={styles.media}
      src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
    />
    <Card.Content sx={styles.content}>
      <Card.Title
        headline={headline ?? 'Headline'}
        subhead='Subhead'
        supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
      />
    </Card.Content>
  </>
);

const colsProps: IComponentPropsWithLegend<ICardProps> = [
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
      rowsProps={[
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
          children: <ActionableContent headline='Actionable' />,
          onClick: (args: React.MouseEvent<HTMLElement>) =>
            sbHandleEvent('click:card', args),
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    sx: styles.card,
  },
};

export const Elevated: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Card}
      props={props}
      colsProps={colsProps}
      rowsProps={statesProps}
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
      colsProps={colsProps}
      rowsProps={statesProps}
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
      colsProps={colsProps}
      rowsProps={statesProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
