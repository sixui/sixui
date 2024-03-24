import { useCallback, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@olivierpascal/helpers';

import type { IStyles } from '@/helpers/types';
import type { ITextFieldStyleKey } from './TextField.styledefs';
import type { IFormStyleKey } from '@/components/utils/Form/Form.styledefs';
import {
  type IComponentPresentation,
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

const styles = stylex.create({
  host: {
    width: 200,
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<ITextFieldProps>;

const states: Array<IComponentPresentation<ITextFieldProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const rows: Array<IComponentPresentation<ITextFieldProps>> = [
  { legend: 'Empty' },
  { legend: 'Label', props: { label: 'Label' } },
  { legend: 'Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'Value',
    props: {
      value: 'Value',
      prefixText: '$',
      suffixText: '.00',
    },
  },
  { legend: 'Error', props: { value: 'Value', hasError: true } },
];

const groups: Array<IComponentPresentation<ITextFieldProps>> = [
  { legend: 'Input' },
  { legend: 'Textarea', props: { type: 'textarea' } },
];

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextField}
      props={props}
      cols={states}
      rows={rows}
      groups={groups}
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
      component={TextField}
      props={props}
      cols={states}
      rows={rows}
      groups={groups}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

const ControlledTextField: React.FC<Omit<ITextFieldProps, 'onChange'>> = (
  props,
) => {
  const [value, setValue] = useState(props.value ?? '');
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

export const Validation: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledTextField}
      props={props}
      cols={[
        { legend: 'Filled', props: { variant: 'filled' } },
        { legend: 'Outlined', props: { variant: 'outlined' } },
      ]}
      rows={[
        {
          props: {
            label: 'Required',
            required: true,
            supportingText: '* this field is required',
          },
        },
        {
          props: {
            label: 'Required',
            value: 'Initial value',
            required: true,
            supportingText: '* this field is required',
          },
        },
        {
          props: {
            type: 'number',
            label: 'Numeric',
            min: 1,
            max: 10,
            supportingText: 'Enter a number between 1 and 10',
            noSpinner: true,
          },
        },
        {
          props: {
            label: 'Length',
            minLength: 3,
            maxLength: 10,
            supportingText: '3 to 10 characters',
          },
        },
        {
          props: {
            label: 'Length',
            minLength: 3,
            supportingText: 'Min 3 characters',
          },
        },
        {
          props: {
            label: 'Length',
            maxLength: 10,
            supportingText: 'Max 10 characters',
          },
        },
        {
          props: {
            styles: stylex.create<IStyles<ITextFieldStyleKey>>({
              host: {
                textAlign: 'end',
              },
            }),
            label: 'Pattern',
            pattern: '[a-zA-Z]+',
            placeholder: 'username',
            suffixText: '@gmail.com',
            supportingText: 'Characters only',
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
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
    <Form onSubmit={handleSubmit} styles={formStyles} sx={styles.host}>
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

export const FormDemo: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledForm}
      props={props}
      cols={[
        { legend: 'Filled', props: { variant: 'filled' } },
        { legend: 'Outlined', props: { variant: 'outlined' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
