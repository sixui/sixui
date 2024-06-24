import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
  faEgg,
  faFish,
} from '@fortawesome/free-solid-svg-icons';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

import { Select, type ISelectProps } from './Select';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 350,
    // Only for screenshot:
    // paddingBottom: 305,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<ISelectProps>;

export const Basic: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    variant: 'outlined',
    label: 'Fruit',
    children: (
      <>
        <Select.Option value={null}>Null</Select.Option>
        <Select.Option
          value='1'
          leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
        >
          Apple
        </Select.Option>
        <Select.Option
          value='2'
          leadingIcon={<FontAwesomeIcon icon={faLemon} />}
          disabled
        >
          Lemon
        </Select.Option>
        <Select.Option
          value='3'
          leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
        >
          Carrot
        </Select.Option>
        <Select.Option
          value='4'
          leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
          supportingText='Spicy'
        >
          Pepper
        </Select.Option>
        <Select.Option value='5' leadingIcon={<FontAwesomeIcon icon={faEgg} />}>
          Egg
        </Select.Option>
        <Select.Option
          value='6'
          leadingIcon={<FontAwesomeIcon icon={faFish} />}
        >
          Fish
        </Select.Option>
      </>
    ),
  },
};

export default meta;
