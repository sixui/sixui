import type { Meta, StoryObj } from '@storybook/react';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IButtonBaseProps } from './ButtonBase.types';
import { Box } from '~/components/Box';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { ButtonBase } from './ButtonBase';

const meta = {
  component: ButtonBase,
  args: {
    children: (
      <>
        <FontAwesomeIcon icon={faCartPlus} />
        <Box as="span" pl="$2">
          Add to cart
        </Box>
      </>
    ),
  },
} satisfies Meta<typeof ButtonBase>;

type IStory = StoryObj<typeof meta>;

const rows: Array<IComponentPresentation<IButtonBaseProps>> = [
  { legend: 'Normal' },
  { legend: 'Read-only', props: { readOnly: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const interactionsStates: Array<IComponentPresentation<IButtonBaseProps>> = [
  {
    legend: 'Normal',
    props: {
      children: 'Normal',
    },
  },
  {
    legend: 'Focused',
    props: { children: 'Focused', interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { children: 'Hovered', interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { children: 'Pressed', interactions: { pressed: true } },
  },
];

const ButtonBaseShowcase = componentShowcaseFactory(ButtonBase);

export const Unstyled: IStory = {
  render: (props) => (
    <ButtonBaseShowcase props={props} cols={interactionsStates} rows={rows} />
  ),
};

export const Styled: IStory = {
  render: (props) => (
    <ButtonBaseShowcase props={props} cols={interactionsStates} rows={rows} />
  ),
  args: {
    display: 'flex',
    alignItems: 'center',
    elevation: '$1',
    px: '$3',
    h: '40px',
    shape: '$sm',
    surface: '$primaryContainer',
    c: '$onPrimaryContainer',
  },
};

export default meta;
