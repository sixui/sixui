import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import type { IFieldBaseProps, IFieldBaseVariant } from './FieldBase.types';
import { px } from '~/helpers/styles/px';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { IconButton } from '../IconButton';
import { FieldBase } from './FieldBase';

// https://github.com/material-components/material-web/blob/main/field/demo/stories.ts

const meta = {
  component: FieldBase,
} satisfies Meta<typeof FieldBase>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: px(240),
  // children: <Placeholder surface='$onSurface' expanded disabled />,
  children: <input style={{ width: '100%' }} />,
} satisfies Partial<IFieldBaseProps>;

const states: Array<IComponentPresentation<IFieldBaseProps>> = [
  { legend: 'Enabled' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Read only', props: { readOnly: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IFieldBaseProps>> = [
  { legend: 'Empty' },
  {
    legend: 'Label',
    props: { label: 'Label' },
  },
  {
    legend: 'Placeholder',
    props: { label: 'Label', placeholder: 'Placeholder', children: undefined },
  },
  {
    legend: 'Populated',
    props: {
      label: 'Label',
      populated: true,
    },
  },
  {
    legend: 'Slots',
    props: {
      label: 'Label',
      supportingText: 'Supporting text',
      count: 2,
      max: 10,
      leadingIcon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
      end: <IconButton icon={<FontAwesomeIcon icon={faXmark} />} />,
    },
  },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Error', props: { hasError: true, errorText: 'Error text' } },
  { legend: 'Resizable', props: { resizable: true } },
];

const FieldBaseShowcase = makeComponentShowcase(FieldBase);

export const Variants: IStory = {
  render: (props) => (
    <FieldBaseShowcase
      props={props}
      cols={(['filled', 'outlined'] as Array<IFieldBaseVariant>).map(
        (variant) => ({
          props: {
            variant,
            label: capitalizeFirstLetter(variant),
          },
        }),
      )}
    />
  ),
  args: defaultArgs,
};

export const Sizes: IStory = {
  render: (props) => (
    <FieldBaseShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { size: 'xs' } },
        { legend: 'Small', props: { size: 'sm' } },
        { legend: 'Medium', props: { size: 'md' } },
        { legend: 'Large', props: { size: 'lg' } },
        { legend: 'Extra large', props: { size: 'xl' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
    label: 'Label',
  },
};

export const Densities: IStory = {
  render: (props) => (
    <FieldBaseShowcase
      cols={[-2, -1, 0].map((density) => ({
        legend: String(density),
        props: {
          density,
        },
      }))}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
    label: 'Label',
  },
};

export const Filled: IStory = {
  render: (props) => (
    <FieldBaseShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <FieldBaseShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
