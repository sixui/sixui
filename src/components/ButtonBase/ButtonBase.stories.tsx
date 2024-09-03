import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import type { IButtonBaseProps } from './ButtonBase.types';
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
      <span>Add to cart</span>
    </>
  ),
} satisfies Partial<IButtonBaseProps>;

const cols: Array<IComponentPresentation<IButtonBaseProps>> = [
  { legend: 'Enabled' },
  { legend: 'Disabled', props: { disabled: true } },
];

const ButtonBaseShowcase = makeComponentShowcase(ButtonBase);

export const Unstyled: IStory = {
  render: (props) => <ButtonBaseShowcase props={props} cols={cols} />,
  args: defaultArgs,
};

export const Styled: IStory = {
  render: (props) => <ButtonBaseShowcase props={props} cols={cols} />,
  args: {
    ...defaultArgs,
    elevation: '$1',
    p: '$2',
    corner: '$sm',
    surface: '$primaryContainer',
    c: '$onPrimaryContainer',
  },
};

export default meta;
