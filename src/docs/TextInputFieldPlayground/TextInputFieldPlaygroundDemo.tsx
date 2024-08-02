import stylex from '@stylexjs/stylex';

import type { ITextFieldBasePlaygroundDemoProps } from '~/docs/TextFieldBasePlayground/TextFieldBasePlaygroundDemo';
import {
  TextInputField,
  type ITextInputFieldProps,
} from '~/components/TextInputField';

const styles = stylex.create({
  host: {
    width: 240,
  },
});

export type ITextInputFieldPlaygroundDemoProps =
  ITextFieldBasePlaygroundDemoProps<
    HTMLInputElement,
    React.ComponentPropsWithoutRef<'input'>
  > & {
    textInputField: ITextInputFieldProps;
  };

export const TextInputFieldPlaygroundDemo: React.FC<
  ITextInputFieldPlaygroundDemoProps
> = (props) => (
  <div {...stylex.props(styles.host)}>
    <TextInputField
      {...props.fieldBase}
      {...props.textFieldBase}
      {...props.textInputField}
    />
  </div>
);
