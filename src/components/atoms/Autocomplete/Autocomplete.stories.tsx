import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
  faGift,
} from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase2';
import { Autocomplete, type IAutocompleteProps } from './Autocomplete';

const meta = {
  component: Autocomplete,
} satisfies Meta<typeof Autocomplete>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 200,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<IAutocompleteProps>;

const ControlledAutocomplete: React.FC<Omit<IAutocompleteProps, 'onChange'>> = (
  props,
) => {
  const [value, setValue] = useState(props.value ?? '');

  const handleChange = (value: string | null): void => {
    setValue(value ?? '');
    void sbHandleEvent('onChange', value);
  };

  return <Autocomplete {...props} value={value} onChange={handleChange} />;
};

const states: Array<IComponentPresentation<IAutocompleteProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IAutocompleteProps>> = [
  { legend: 'Basic' },
  { legend: 'With Label', props: { label: 'Label' } },
  { legend: 'With Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'With Default Value',
    props: { defaultValue: 'carrot' },
  },
  {
    legend: 'Controlled',
    props: { value: 'carrot' },
    component: ControlledAutocomplete,
  },
  {
    legend: 'Allow Custom Value',
    props: { allowCustomValues: true },
  },
];

const options = [
  <Autocomplete.Option
    key={0}
    value='apple'
    disabled
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </Autocomplete.Option>,
  <Autocomplete.Divider key={1} />,
  <Autocomplete.Option
    key={2}
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
  >
    Lemon
  </Autocomplete.Option>,
  <Autocomplete.Option
    key={3}
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
  >
    Carrot
  </Autocomplete.Option>,
  <Autocomplete.Option
    key={4}
    value='hotPepper'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    supportingText='Yummy!'
  >
    Hot Pepper
  </Autocomplete.Option>,
  <Autocomplete.Option
    key={5}
    value='christmas'
    leadingIcon={<FontAwesomeIcon icon={faGift} />}
  >
    Noël
  </Autocomplete.Option>,
];

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Autocomplete}
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
      component={Autocomplete}
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
