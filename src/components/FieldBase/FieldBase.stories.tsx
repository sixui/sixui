import type { Meta, StoryObj } from '@storybook/react';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IFieldBaseProps, IFieldBaseVariant } from './FieldBase.types';
import { px } from '~/helpers/styles/px';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';
import { FieldBase } from './FieldBase';

// https://github.com/material-components/material-web/blob/main/field/demo/stories.ts

const meta = {
  component: FieldBase,
} satisfies Meta<typeof FieldBase>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: px(240),
  children: <Placeholder surface="$onSurface" expanded disabled />,
} satisfies Partial<IFieldBaseProps>;

const states: Array<IComponentPresentation<IFieldBaseProps>> = [
  { legend: 'Normal' },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Read only', props: { readOnly: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IFieldBaseProps>> = [
  {
    legend: 'Label',
    props: { label: 'Label' },
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
      prefixText: '$',
      suffixText: '.00',
    },
  },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Error', props: { hasError: true, errorText: 'Error text' } },
  { legend: 'Resizable', props: { resizable: true } },
];

const FieldBaseShowcase = componentShowcaseFactory(FieldBase);

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

export const Scales: IStory = {
  render: (props) => (
    <FieldBaseShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
      rows={[
        { legend: 'Filled', props: { variant: 'filled' } },
        { legend: 'Outlined', props: { variant: 'outlined' } },
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
      rows={[
        { legend: 'Filled', props: { variant: 'filled' } },
        { legend: 'Outlined', props: { variant: 'outlined' } },
      ]}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
    label: 'Label',
  },
};

export const States: IStory = {
  render: (props) => (
    <FieldBaseShowcase
      props={props}
      cols={[
        { legend: 'Normal' },
        { legend: 'Focused', props: { interactions: { focused: true } } },
        { legend: 'Loading', props: { loading: true } },
        { legend: 'Disabled', props: { disabled: true } },
      ]}
      rows={[
        { legend: 'Filled', props: { variant: 'filled' } },
        { legend: 'Outlined', props: { variant: 'outlined' } },
      ]}
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
