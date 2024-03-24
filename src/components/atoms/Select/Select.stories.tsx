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
import { Select, type ISelectProps } from './Select';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

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
} satisfies Partial<ISelectProps>;

const ControlledSelect: React.FC<Omit<ISelectProps, 'onChange'>> = (props) => {
  const [value, setValue] = useState(props.value ?? null);

  const handleChange = (value: string | null): void => {
    setValue(value);
    void sbHandleEvent('onChange', value);
  };

  return <Select {...props} value={value} onChange={handleChange} />;
};

const pictureOptions = [
  <Select.Option key='apple' value='apple' label='Apple'>
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Apple'
      src='https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </Select.Option>,
  <Select.Option key='lemon' value='lemon' label='Lemon'>
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Lemon'
      src='https://images.unsplash.com/photo-1590004953392-5aba2e72269a?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </Select.Option>,
];

const options = [
  <Select.Option
    key='apple'
    value='apple'
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </Select.Option>,
  <Select.Option
    key='lemon'
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
    disabled
  >
    Lemon
  </Select.Option>,
  <Select.Option
    key='carrot'
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
    trailingSupportingText='4/6'
  >
    Carrot
  </Select.Option>,
  <Select.Divider key='divider1' />,
  <Select.Option
    key='egg'
    value='egg'
    leadingIcon={<FontAwesomeIcon icon={faEgg} />}
  >
    Egg
  </Select.Option>,
  <Select.Option
    key='fish'
    value='fish'
    leadingIcon={<FontAwesomeIcon icon={faFish} />}
  >
    Fish
  </Select.Option>,
  <Select.Divider key='divider2' />,
  <Select.Option
    key='pepperHot'
    value='pepperHot'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    headline='Yummy!'
  >
    Pepper Hot
  </Select.Option>,
];

const lotOfOptions = Array.from({ length: 100 }, (_, i) => (
  <Select.Option key={i} value={String(i + 1)} label={`Option ${i + 1}`} />
));

const variants: Array<IComponentPresentation<ISelectProps>> = [
  { legend: 'Filled', props: { variant: 'filled' } },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const useCases: Array<IComponentPresentation<ISelectProps>> = [
  { legend: 'Basic', props: { children: options } },
  {
    legend: 'With Empty Option',
    props: {
      children: [
        <Select.Option key='empty' value=''>
          Nothing
        </Select.Option>,
        ...options,
      ],
    },
  },
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
    component: ControlledSelect,
  },
  {
    legend: 'Option Labels',
    props: { children: pictureOptions },
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
];

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Select}
      props={props}
      cols={variants}
      rows={useCases}
    />
  ),
  args: defaultArgs,
};

export const Contained: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <div {...stylex.props(styles.clipper)}>
          <Select {...props} />
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
