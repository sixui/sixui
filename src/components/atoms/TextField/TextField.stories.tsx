import { useCallback, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@olivierpascal/helpers';

import type { ITextFieldStyleKey } from './TextField.styledefs';
import type { IStyles } from '@/helpers/types';
import type { IFormStyleKey } from '@/components/utils/Form/Form.styledefs';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { TextField, type ITextFieldProps } from './TextField';
import { IconButton } from '../IconButton/IconButton';
import { Button } from '../Button';
import { Form } from '@/components/utils/Form/Form';

// https://m3.material.io/components/text-fields/overview
// https://material-web.dev/components/text-field/
// https://github.com/material-components/material-web/blob/main/textfield/demo/stories.ts

const meta = {
  component: TextField,
} satisfies Meta<typeof TextField>;

type IStory = StoryObj<typeof meta>;

const textFieldStyles = stylex.create<IStyles<ITextFieldStyleKey>>({
  host: {
    width: '248px',
  },
});

const defaultArgs = {} satisfies Partial<ITextFieldProps>;

const statesProps: IComponentPropsWithLegend<ITextFieldProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  {
    $legend: 'Disabled',
    disabled: true,
  },
];

const rowsProps: IComponentPropsWithLegend<ITextFieldProps> = [
  { $legend: 'Basic' },
  { $legend: 'Required', required: true },
  {
    $legend: 'Populated',
    defaultValue: 'Value',
  },
  { $legend: 'Error', hasError: true },
  {
    $legend: 'Icons',
    leadingIcon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    trailingIcon: <FontAwesomeIcon icon={faXmark} />,
  },
];

const inputRowProps: IComponentPropsWithLegend<ITextFieldProps> = [
  {
    $legend: 'Préfix / Suffix',
    type: 'number',
    defaultValue: '0',
    prefixText: '$',
    suffixText: '.00',
  },
];

const ControlledForm: React.FC<ITextFieldProps> = (props) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<string>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      setSubmitting(true);
      void delay(1000)
        .then(() => setResult(JSON.stringify({ firstName, lastName })))
        .finally(() => setSubmitting(false));
    },
    [firstName, lastName],
  );

  return (
    <Form onSubmit={handleSubmit} styles={formStyles}>
      <div {...stylex.props(formStyles2.col)}>
        <TextField
          {...props}
          label='First name'
          name='firstName'
          value={firstName}
          onChange={(_, value) => setFirstName(value)}
          autoComplete='given-name'
          autoCapitalize='words'
          required
        />
        <TextField
          {...props}
          label='Last name'
          name='lastName'
          value={lastName}
          onChange={(_, value) => setLastName(value)}
          autoComplete='family-name'
          autoCapitalize='words'
          required
        />
        <div {...stylex.props(formStyles2.buttons)}>
          <Button type='submit' loading={submitting}>
            Submit
          </Button>
        </div>
        {result ? <div>{result}</div> : null}
      </div>
    </Form>
  );
};

const ControlledTextField: React.FC<Omit<ITextFieldProps, 'onChange'>> = (
  props,
) => {
  const [value, setValue] = useState(props.defaultValue ?? '');
  const textFieldRef = useRef<HTMLInputElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);

  const clearInput = useCallback(() => {
    iconButtonRef.current?.blur();
    setValue('');
    textFieldRef.current?.focus();
  }, []);

  return (
    <TextField
      {...props}
      ref={textFieldRef}
      value={value}
      onChange={(_, value) => setValue(value)}
      end={
        <IconButton
          ref={iconButtonRef}
          icon={<FontAwesomeIcon icon={faXmark} />}
          onClick={clearInput}
        />
      }
    />
  );
};

export const Demo: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledForm}
      props={props}
      colsProps={[
        { $legend: 'Filled', variant: 'filled' },
        { $legend: 'Outlined', variant: 'outlined' },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Uncontrolled: IStory = {
  render: (props) => <ComponentShowcase component={TextField} props={props} />,
  args: defaultArgs,
};

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase component={ControlledTextField} props={props} />
  ),
  args: defaultArgs,
};

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      colsProps={[{ variant: 'filled' }, { variant: 'outlined' }]}
    />
  ),
  args: {
    ...defaultArgs,
    styles: textFieldStyles,
    label: 'Label',
    supportingText: 'Supporting text',
  },
};

export const FilledInput: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      colsProps={statesProps}
      rowsProps={[...rowsProps, ...inputRowProps]}
    />
  ),
  args: {
    ...defaultArgs,
    styles: textFieldStyles,
    label: 'Label',
    supportingText: 'Supporting text',
    variant: 'filled',
    placeholder: 'Placeholder',
  },
};

export const FilledTextarea: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    styles: textFieldStyles,
    label: 'Label',
    supportingText: 'Supporting text',
    variant: 'filled',
    type: 'textarea',
    placeholder: 'Placeholder',
  },
};

export const OutlinedInput: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      colsProps={statesProps}
      rowsProps={[...rowsProps, ...inputRowProps]}
    />
  ),
  args: {
    ...defaultArgs,
    styles: textFieldStyles,
    label: 'Label',
    supportingText: 'Supporting text',
    variant: 'outlined',
    placeholder: 'Placeholder',
  },
};

export const OutlinedTextarea: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    styles: textFieldStyles,
    label: 'Label',
    supportingText: 'Supporting text',
    variant: 'outlined',
    type: 'textarea',
    placeholder: 'Placeholder',
  },
};

export const Validation: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledTextField}
      props={props}
      colsProps={[
        { $legend: 'Filled', variant: 'filled' },
        { $legend: 'Outlined', variant: 'outlined' },
      ]}
      rowsProps={[
        {
          label: 'Required',
          required: true,
          supportingText: '* this field is required',
        },
        {
          label: 'Required',
          defaultValue: 'Initial value',
          required: true,
          supportingText: '* this field is required',
        },
        {
          type: 'number',
          label: 'Numeric',
          min: 1,
          max: 10,
          supportingText: 'Enter a number between 1 and 10',
          noSpinner: true,
        },
        {
          label: 'Length',
          minLength: 3,
          maxLength: 10,
          supportingText: '3 to 10 characters',
        },
        {
          label: 'Length',
          minLength: 3,
          supportingText: 'Min 3 characters',
        },
        {
          label: 'Length',
          maxLength: 10,
          supportingText: 'Max 10 characters',
        },
        {
          styles: [
            textFieldStyles,
            stylex.create<IStyles<ITextFieldStyleKey>>({
              host: {
                textAlign: 'end',
              },
            }),
          ],
          label: 'Pattern',
          pattern: '[a-zA-Z]+',
          placeholder: 'username',
          suffixText: '@gmail.com',
          supportingText: 'Characters only',
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    styles: textFieldStyles,
    reportOnBlur: true,
  },
};

const formStyles = stylex.create<IStyles<IFormStyleKey>>({
  host: { width: '300px', color: colorRolesVars.onSurface },
});

const formStyles2 = stylex.create({
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
    gap: '1em',
  },
});

export default meta;
