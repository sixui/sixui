import stylex from '@stylexjs/stylex';

import type { ITextFieldBasePlaygroundDemoProps } from '~/docs/TextFieldBasePlayground/TextFieldBasePlaygroundDemo';
import {
  TextAreaField,
  type ITextAreaFieldProps,
} from '~/components/TextAreaField';

const styles = stylex.create({
  host: {
    width: 240,
  },
});

export type ITextAreaFieldPlaygroundDemoProps =
  ITextFieldBasePlaygroundDemoProps<
    HTMLTextAreaElement,
    React.ComponentPropsWithoutRef<'textarea'>
  > & {
    textAreaField: ITextAreaFieldProps;
  };

export const TextAreaFieldPlaygroundDemo: React.FC<
  ITextAreaFieldPlaygroundDemoProps
> = (props) => (
  <div {...stylex.props(styles.host)}>
    <TextAreaField
      {...props.fieldBase}
      {...props.textFieldBase}
      {...props.textAreaField}
    />
  </div>
);
