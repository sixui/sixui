import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import type { IFieldBaseProps, IFieldBaseVariant } from './FieldBase.types';
import { scaleTokens } from '~/themes/base/scale.stylex';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import { FieldBase } from './FieldBase';
import { Placeholder } from '../Placeholder';

// https://github.com/material-components/material-web/blob/main/field/demo/stories.ts

const meta = {
  component: FieldBase,
} satisfies Meta<typeof FieldBase>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: `calc(240px * ${scaleTokens.scale})`,
  },
});

const defaultArgs = {
  sx: styles.host,
  children: <Placeholder surface='onSurface' corner='none' expand disabled />,
} satisfies Partial<IFieldBaseProps>;

const states: Array<IComponentPresentation<IFieldBaseProps>> = [
  { legend: 'Enabled' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IFieldBaseProps>> = [
  { legend: 'Empty' },
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
      trailingIcon: <FontAwesomeIcon icon={faXmark} />,
    },
  },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Error', props: { hasError: true, errorText: 'Error text' } },
  { legend: 'Resizable', props: { resizable: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FieldBase}
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

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FieldBase}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FieldBase}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
