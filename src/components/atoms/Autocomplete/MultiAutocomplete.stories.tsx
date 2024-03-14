import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase2';
import {
  MultiAutocomplete,
  type IMultiAutocompleteProps,
} from './MultiAutocomplete';

const meta = {
  component: MultiAutocomplete,
} satisfies Meta<typeof MultiAutocomplete>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 300,
  },
  pictureOption: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: shapeVars.corner$md,
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
} satisfies Partial<IMultiAutocompleteProps>;

const ControlledMultiAutocomplete: React.FC<
  Omit<IMultiAutocompleteProps, 'onChange'>
> = (props) => {
  const [value, setValue] = useState(props.value ?? []);

  const handleChange = (value: Array<string>): void => {
    setValue(value);
    void sbHandleEvent('onChange', value);
  };

  return <MultiAutocomplete {...props} value={value} onChange={handleChange} />;
};

const pictureOptions = [
  <MultiAutocomplete.Option key='apple' value='apple' label='Apple'>
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Apple'
      src='https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </MultiAutocomplete.Option>,
  <MultiAutocomplete.Option key='lemon' value='lemon' label='Lemon'>
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Lemon'
      src='https://images.unsplash.com/photo-1590004953392-5aba2e72269a?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </MultiAutocomplete.Option>,
];

const options = [
  <MultiAutocomplete.Option
    key='apple'
    value='apple'
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </MultiAutocomplete.Option>,
  <MultiAutocomplete.Option
    key='lemon'
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
    disabled
  >
    Lemon
  </MultiAutocomplete.Option>,
  <MultiAutocomplete.Option
    key='carrot'
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
    trailingSupportingText='4/6'
  >
    Carrot
  </MultiAutocomplete.Option>,
  <MultiAutocomplete.Divider key='divider1' />,
  <MultiAutocomplete.Option
    key='egg'
    value='egg'
    leadingIcon={<FontAwesomeIcon icon={faEgg} />}
  >
    Egg
  </MultiAutocomplete.Option>,
  <MultiAutocomplete.Option
    key='fish'
    value='fish'
    leadingIcon={<FontAwesomeIcon icon={faFish} />}
  >
    Fish
  </MultiAutocomplete.Option>,
  <MultiAutocomplete.Divider key='divider2' />,
  <MultiAutocomplete.Option
    key='pepperHot'
    value='pepperHot'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    headline='Yummy!'
  >
    Pepper Hot
  </MultiAutocomplete.Option>,
];

const variants: Array<IComponentPresentation<IMultiAutocompleteProps>> = [
  { legend: 'Filled', props: { variant: 'filled' } },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const useCases: Array<IComponentPresentation<IMultiAutocompleteProps>> = [
  { legend: 'Basic', props: { children: options } },
  { legend: 'With Label', props: { children: options, label: 'Label' } },
  {
    legend: 'With Placeholder',
    props: { children: options, placeholder: 'Food' },
  },
  {
    legend: 'With Supporting Text',
    props: { children: options, supportingText: 'Choose your favorite food' },
  },
  {
    legend: 'With Default Value',
    props: { children: options, defaultValue: ['carrot'] },
  },
  {
    legend: 'Controlled',
    props: { children: options, value: ['carrot'] },
    component: ControlledMultiAutocomplete,
  },
  {
    legend: 'Display Text',
    props: { children: pictureOptions },
  },
  {
    legend: 'Allow Custom Values',
    props: { children: options, allowCustomValues: true },
  },
];

export const UseCases: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={MultiAutocomplete}
      props={props}
      cols={variants}
      rows={useCases}
    />
  ),
  args: defaultArgs,
};

export default meta;
