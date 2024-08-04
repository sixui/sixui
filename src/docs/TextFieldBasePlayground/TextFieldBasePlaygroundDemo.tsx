import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { IFieldBaseProps } from '~/components/FieldBase';
import {
  TextFieldBase,
  type ITextFieldBaseProps,
} from '~/components/TextFieldBase';

const styles = stylex.create({
  host: {
    width: 240,
  },
});

export type ITextFieldBasePlaygroundDemoProps<
  TElement extends HTMLElement,
  TChildrenProps extends object = object,
> = {
  fieldBase: IOmit<IFieldBaseProps, 'children' | 'styles'>;
  textFieldBase: ITextFieldBaseProps<TElement, TChildrenProps>;
};

export const TextFieldBasePlaygroundDemo: React.FC<
  ITextFieldBasePlaygroundDemoProps<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
  >
> = (props) => (
  <div {...stylex.props(styles.host)}>
    <TextFieldBase {...props.fieldBase} {...props.textFieldBase} />
  </div>
);
