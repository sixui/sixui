import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
} from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase2';
import { SelectMultiple, type ISelectMultipleProps } from './SelectMultiple';
import { InputChip } from '@/components/atoms/Chip';

const meta = {
  component: SelectMultiple,
} satisfies Meta<typeof SelectMultiple>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 200,
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<ISelectMultipleProps>;

const states: Array<IComponentPresentation<ISelectMultipleProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rowsUncontrolled: Array<IComponentPresentation<ISelectMultipleProps>> = [
  { legend: 'Basic' },
  { legend: 'With Label', props: { label: 'Label' } },
  { legend: 'With Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'With Default Value',
    props: { defaultValue: ['lemon', 'pepperHot'] },
  },
];

const rowsControlled: Array<IComponentPresentation<ISelectMultipleProps>> = [
  { legend: 'Basic' },
  { legend: 'With Label', props: { label: 'Label' } },
  { legend: 'With Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'With Default Value',
    props: { value: ['lemon', 'pepperHot'] },
  },
  {
    legend: 'With Chips',
    props: {
      value: ['lemon'],
      renderValue: (options) => (
        <div {...stylex.props(styles.chips)}>
          {options.map((option, index) => (
            <InputChip
              key={index}
              label={option.props.children}
              onClick={(e) => e.preventDefault()}
              onDelete={(e) => e.preventDefault()}
            />
          ))}
        </div>
      ),
    },
  },
];

const options = [
  <SelectMultiple.Option
    key={0}
    value='apple'
    disabled
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </SelectMultiple.Option>,
  <SelectMultiple.Divider key={1} />,
  <SelectMultiple.Option
    key={2}
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
  >
    Lemon
  </SelectMultiple.Option>,
  <SelectMultiple.Option
    key={3}
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
  >
    Carrot
  </SelectMultiple.Option>,
  <SelectMultiple.Option
    key={4}
    value='pepperHot'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    supportingText='Yummy!'
  >
    Pepper Hot
  </SelectMultiple.Option>,
];

const ControlledSelect: React.FC<Omit<ISelectMultipleProps, 'onChange'>> = (
  props,
) => {
  const [value, setValue] = useState(props.value ?? []);

  const handleChange = (value: Array<string>): void => {
    setValue(value);
    void sbHandleEvent('onChange', value);
  };

  return <SelectMultiple {...props} value={value} onChange={handleChange} />;
};

export const FilledUncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SelectMultiple}
      props={props}
      cols={states}
      rows={rowsUncontrolled}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
  },
};

export const FilledControlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledSelect}
      props={props}
      cols={states}
      rows={rowsControlled}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
  },
};

export const OutlinedUncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SelectMultiple}
      props={props}
      cols={states}
      rows={rowsUncontrolled}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
    variant: 'outlined',
  },
};

export const OutlinedControlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledSelect}
      props={props}
      cols={states}
      rows={rowsControlled}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
    variant: 'outlined',
  },
};

export default meta;
