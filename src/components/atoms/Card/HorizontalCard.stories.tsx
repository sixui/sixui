import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Button } from '@/components/atoms/Button';
import { Card, type ICardProps, type ICardOwnProps } from './Card';
import { CardContent } from '../CardContent';
import { CardMedia } from '../CardMedia';
import { CardTitle } from '../CardTitle';
import { CardActions } from '../CardActions';

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
    width: 156,
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

const NonActionableContent: React.FC<{ headline?: string }> = ({
  headline,
}) => (
  <>
    <CardContent sx={styles.content}>
      <CardMedia
        sx={styles.mediaInner}
        src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
      />
      <div {...stylex.props(styles.innerContent)}>
        <CardTitle
          headline={headline ?? 'Headline'}
          supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
        />
        <CardActions sx={styles.actions}>
          <Button
            variant='outlined'
            onClick={(...args) => sbHandleEvent('click:secondaryAction', args)}
          >
            Secondary
          </Button>
          <Button
            onClick={(...args) => sbHandleEvent('click:primaryAction', args)}
          >
            Primary
          </Button>
        </CardActions>
      </div>
    </CardContent>
  </>
);

const NonActionableContentVariant: React.FC<{ headline?: string }> = ({
  headline,
}) => (
  <>
    <CardMedia
      sx={styles.media}
      src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
    />
    <CardContent sx={styles.content}>
      <div {...stylex.props(styles.innerContent)}>
        <CardTitle
          headline={headline ?? 'Headline'}
          supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
        />
        <CardActions sx={styles.actions}>
          <Button
            onClick={(...args) => sbHandleEvent('click:primaryAction', args)}
            type='submit'
          >
            Primary
          </Button>
        </CardActions>
      </div>
    </CardContent>
  </>
);

const ActionableContent: React.FC<{ headline?: string }> = ({ headline }) => (
  <>
    <CardMedia
      sx={styles.media}
      src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
    />
    <CardContent sx={styles.content}>
      <div {...stylex.props(styles.innerContent)}>
        <CardTitle
          headline={headline ?? 'Headline'}
          supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
        />
        <CardActions sx={styles.actions}>
          <Button
            onClick={(...args) => sbHandleEvent('click:secondaryAction', args)}
            type='submit'
            variant='outlined'
          >
            Secondary
          </Button>
        </CardActions>
      </div>
    </CardContent>
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

const cols: Array<IComponentPresentation<ICardOwnProps>> = [
  {
    legend: 'Non-actionable',
    props: { children: <NonActionableContent /> },
  },
  {
    legend: 'Actionable',
    props: {
      onClick: (...args) => sbHandleEvent('click:cardAction', args),
      children: <ActionableContent />,
    },
  },
];

const variants: Array<IComponentPresentation<ICardOwnProps>> = [
  {
    legend: 'Elevated',
    props: {
      variant: 'elevated',
      children: <NonActionableContent headline='Non-actionable' />,
    },
  },
  {
    legend: 'Filled',
    props: {
      variant: 'filled',
      children: <ActionableContent headline='Actionable' />,
      onClick: (...args) => sbHandleEvent('click:card', args),
    },
  },
  {
    legend: 'Outlined',
    props: {
      variant: 'outlined',
      children: <NonActionableContentVariant headline='Non-actionable' />,
    },
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase component={Card} props={props} rows={variants} />
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
      cols={cols}
      rows={states}
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
      cols={cols}
      rows={states}
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
      cols={cols}
      rows={states}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
