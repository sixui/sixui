import stylex from '@stylexjs/stylex';

import type { ITextAreaFieldProps } from '~/components/TextAreaField';
import type { ITextFieldBasePlaygroundDemoProps } from '~/docs/TextFieldBasePlayground/TextFieldBasePlaygroundDemo';
import { TextAreaField } from '~/components/TextAreaField';
import { scaleTokens } from '~/themes/base/scale.stylex';

const styles = stylex.create({
  host: {
    width: `calc(240px * ${scaleTokens.scale})`,
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
