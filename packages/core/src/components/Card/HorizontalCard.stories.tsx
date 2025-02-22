import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICardProps } from './Card.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Card } from './Card';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const MEDIA_URL =
  'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600';

const defaultArgs = {
  w: '$144',
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

const cols: Array<IComponentPresentation<ICardProps>> = [
  {
    legend: 'Example A',
    props: {
      children: (
        <>
          <Card.Content
            style={{
              display: 'grid',
              gridTemplateColumns: 'min-content 1fr',
            }}
          >
            <Card.Media
              src={MEDIA_URL}
              h="100%"
              style={{
                aspectRatio: 1,
              }}
            />
            <Flex direction="column" gap="$2">
              <Card.Title
                subhead="Subhead"
                supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
              />
              <Card.Actions p="$0">
                <Button
                  variant="filled"
                  onClick={(...args) => sbHandleEvent('action:onClick', args)}
                >
                  Action
                </Button>
              </Card.Actions>
            </Flex>
          </Card.Content>
        </>
      ),
    },
  },
  {
    legend: 'Example B',
    props: {
      children: (
        <Flex direction="row">
          <Card.Media src={MEDIA_URL} h="$36" w="$36" />
          <Card.Content>
            <Flex direction="column" gap="$2">
              <Card.Title
                subhead="Subhead"
                supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
              />
              <Card.Actions p="$0">
                <Button
                  variant="filled"
                  onClick={(...args) => sbHandleEvent('action:onClick', args)}
                >
                  Action
                </Button>
              </Card.Actions>
            </Flex>
          </Card.Content>
        </Flex>
      ),
    },
  },
];

const CardShowcase = componentShowcaseFactory(Card);

export const Filled: IStory = {
  render: (props) => <CardShowcase props={props} rows={states} cols={cols} />,
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Elevated: IStory = {
  render: (props) => <CardShowcase props={props} rows={states} cols={cols} />,
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Outlined: IStory = {
  render: (props) => <CardShowcase props={props} rows={states} cols={cols} />,
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
