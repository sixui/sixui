import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import type { IButtonBaseProps } from './ButtonBase.types';
import { Box } from '../Box';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { ButtonBase } from './ButtonBase';

const meta = {
  component: ButtonBase,
} satisfies Meta<typeof ButtonBase>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <FontAwesomeIcon icon={faCartPlus} />
      <Box as='span' pl='$2'>
        Add to cart
      </Box>
    </>
  ),
} satisfies Partial<IButtonBaseProps>;

const rows: Array<IComponentPresentation<IButtonBaseProps>> = [
  { legend: 'Enabled' },
  { legend: 'Read only', props: { readOnly: true } },
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

const ButtonBaseShowcase = makeComponentShowcase(ButtonBase);

export const Unstyled: IStory = {
  render: (props) => (
    <ButtonBaseShowcase props={props} cols={interactionsStates} rows={rows} />
  ),
  args: defaultArgs,
};

export const Styled: IStory = {
  render: (props) => (
    <ButtonBaseShowcase props={props} cols={interactionsStates} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    elevation: '$1',
    px: '$3',
    h: '$10',
    corner: '$sm',
    surface: '$primaryContainer',
    c: '$onPrimaryContainer',
  },
};

export default meta;
