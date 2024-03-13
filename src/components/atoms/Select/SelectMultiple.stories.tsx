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

const ControlledSelectWithChip: React.FC<
  Omit<ISelectMultipleProps, 'onChange' | 'renderValue'>
> = (props) => {
  const [values, setValues] = useState(props.value ?? []);

  const handleChange = (values: Array<string>): void => {
    setValues(values);
    void sbHandleEvent('onChange', values);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ): void => {
    event.preventDefault();
    setValues((values) => values.filter((v) => v !== value));
  };

  return (
    <SelectMultiple
      {...props}
      value={values}
      onChange={handleChange}
      renderValue={(options) => (
        <div {...stylex.props(styles.chips)}>
          {options.map((option, index) => (
            <InputChip
              key={index}
              label={option.props.children}
              onDelete={(event) => handleDelete(event, option.props.value)}
              icon={option.props.leadingIcon}
            />
          ))}
        </div>
      )}
    />
  );
};

const states: Array<IComponentPresentation<ISelectMultipleProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<ISelectMultipleProps>> = [
  { legend: 'Basic' },
  { legend: 'With Label', props: { label: 'Label' } },
  { legend: 'With Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'With Default Value',
    props: { defaultValue: ['lemon', 'pepperHot'] },
  },
  {
    legend: 'Controlled',
    props: { value: ['lemon', 'pepperHot'] },
    component: ControlledSelect,
  },
  {
    legend: 'With Chips',
    props: { value: ['lemon'] },
    component: ControlledSelectWithChip,
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

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SelectMultiple}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SelectMultiple}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
    variant: 'outlined',
  },
};

export default meta;
