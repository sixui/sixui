import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import type { ICardProps } from './Card.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { IconButton } from '../IconButton/IconButton';
import { ListItem } from '../ListItem';
import { CardContent } from '../CardContent';
import { CardTitle } from '../CardTitle';
import { CardMedia } from '../CardMedia';
import { CardActions } from '../CardActions';
import { Card } from './Card';
import { scaleTokens } from '~/themes/base/scale.stylex';

// https://m3.material.io/components/cards
// https://github.com/material-components/material-web/blob/main/labs/card/demo/stories.ts

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  card: {
    width: `calc(300px * ${scaleTokens.scale})`,
  },
  media: {
    height: `calc(200px * ${scaleTokens.scale})`,
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
    <ListItem
      leading={
        <Avatar src='https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' />
      }
      supportingText='February 21, 2024'
      trailing={
        <IconButton icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />
      }
    >
      John Doe
    </ListItem>
    <CardContent>
      <CardTitle headline={headline ?? 'Headline'} />
      <CardMedia
        sx={styles.media}
        src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
      />
      <CardTitle
        subhead='Subhead'
        supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
      />
    </CardContent>
    <CardActions>
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
    </CardActions>
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
    <CardContent>
      <CardTitle
        headline={headline ?? 'Headline'}
        subhead='Subhead'
        supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
      />
    </CardContent>
    <CardActions>
      <Button
        variant='filled'
        onClick={(...args) => sbHandleEvent('click:primaryAction', args)}
      >
        Primary
      </Button>
    </CardActions>
  </>
);

const ActionableContent: React.FC<{ headline?: string }> = ({ headline }) => (
  <>
    <CardMedia
      sx={styles.media}
      src='https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600'
    />
    <CardContent>
      <CardTitle
        headline={headline ?? 'Headline'}
        subhead='Subhead'
        supportingText='Explain more about the topic shown in the headline and subhead through supporting text.'
      />
    </CardContent>
    <CardActions>
      <Button
        variant='outlined'
        onClick={(...args) => sbHandleEvent('click:secondaryAction', args)}
      >
        Secondary
      </Button>
    </CardActions>
  </>
);

const states: Array<IComponentPresentation<ICardProps>> = [
  { legend: 'Enabled' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Dragged', props: { visualState: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<ICardProps>> = [
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

const variants: Array<IComponentPresentation<ICardProps>> = [
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
