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
} from '@/components/utils/ComponentShowcase';
import { ListItem } from '@/components/atoms/ListItem';
import { Combobox, type IComboboxProps } from './Combobox';

const meta = {
  component: Combobox,
} satisfies Meta<typeof Combobox>;

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
  clipper: {
    position: 'relative',
    overflow: 'hidden',
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<IComboboxProps>;

const ControlledCombobox: React.FC<Omit<IComboboxProps, 'onChange'>> = (
  props,
) => {
  const [value, setValue] = useState(props.value ?? '');

  const handleChange = (value: string): void => {
    setValue(value);
    void sbHandleEvent('onChange', value);
  };

  return <Combobox {...props} value={value} onChange={handleChange} />;
};

const pictureOptions = [
  <Combobox.Option
    key='apple'
    value='apple'
    label='Apple'
    searchableText={['gala', 'golden', 'granny']}
  >
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Apple'
      src='https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </Combobox.Option>,
  <Combobox.Option
    key='lemon'
    value='lemon'
    label='Lemon'
    searchableText={['lisbon', 'eureka', 'meyer']}
  >
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Lemon'
      src='https://images.unsplash.com/photo-1590004953392-5aba2e72269a?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </Combobox.Option>,
];

const options = [
  <Combobox.Option
    key='apple'
    value='apple'
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </Combobox.Option>,
  <Combobox.Option
    key='lemon'
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
    disabled
  >
    Lemon
  </Combobox.Option>,
  <Combobox.Option
    key='carrot'
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
    trailingSupportingText='4/6'
  >
    Carrot
  </Combobox.Option>,
  <Combobox.Divider key='divider1' />,
  <Combobox.Option
    key='egg'
    value='egg'
    leadingIcon={<FontAwesomeIcon icon={faEgg} />}
  >
    Egg
  </Combobox.Option>,
  <Combobox.Option
    key='fish'
    value='fish'
    leadingIcon={<FontAwesomeIcon icon={faFish} />}
  >
    Fish
  </Combobox.Option>,
  <Combobox.Divider key='divider2' />,
  <Combobox.Option
    key='pepperHot'
    value='pepperHot'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    headline='Yummy!'
  >
    Pepper Hot
  </Combobox.Option>,
];

const lotOfOptions = Array.from({ length: 100 }, (_, i) => (
  <Combobox.Option key={i} value={String(i + 1)} label={`Option ${i + 1}`} />
));

const variants: Array<IComponentPresentation<IComboboxProps>> = [
  { legend: 'Filled', props: { variant: 'filled' } },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const useCases: Array<IComponentPresentation<IComboboxProps>> = [
  { legend: 'Basic', props: { children: options } },
  { legend: 'Empty', props: { children: [] } },
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
    props: { children: options, label: 'Label', defaultValue: 'carrot' },
  },
  {
    legend: 'Controlled',
    props: { children: options, value: 'carrot' },
    component: ControlledCombobox,
  },
  {
    legend: 'Display Text',
    props: { children: pictureOptions },
  },
  {
    legend: 'Lot of options',
    props: { children: lotOfOptions },
  },
  {
    legend: 'Allow Custom Values',
    props: { children: options, allowCustomValues: true },
  },
  {
    legend: 'More...',
    props: {
      children: lotOfOptions,
      limit: 5,
      moreOption: ({ hidden }) => (
        <ListItem
          supportingText={`${hidden} more items`}
          onClick={(...args) => sbHandleEvent('click:more', args)}
        >
          More…
        </ListItem>
      ),
    },
  },
  {
    legend: 'More with Default Value',
    props: {
      children: lotOfOptions,
      limit: 5,
      defaultValue: '42',
      moreOption: ({ hidden }) => (
        <ListItem
          supportingText={`${hidden} more items`}
          onClick={(...args) => sbHandleEvent('click:more', args)}
        >
          More…
        </ListItem>
      ),
    },
  },
  {
    legend: 'Select on Focus',
    props: { children: options, selectOnFocus: true },
  },
];

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Combobox}
      props={props}
      cols={variants}
      rows={useCases}
    />
  ),
  args: defaultArgs,
};

export const Nullable: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Combobox}
      props={props}
      cols={variants}
      rows={useCases}
    />
  ),
  args: {
    ...defaultArgs,
    nullable: true,
  },
};

export const Contained: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <div {...stylex.props(styles.clipper)}>
          <Combobox {...props} />
        </div>
      )}
      props={props}
      cols={variants}
      rows={useCases}
    />
  ),
  args: defaultArgs,
};

export default meta;
