import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import { Checkbox, type ICheckboxProps } from '~/components/Checkbox';
import { Labeled } from '~/components/Labeled';
import { commonStyles } from '~/helpers/commonStyles';

export type ICheckboxPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  checkbox: IOmit<ICheckboxProps, 'styles'>;
};

export const CheckboxPlaygroundDemo: React.FC<ICheckboxPlaygroundDemoProps> = (
  props,
) => (
  <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$lg)}>
    <Labeled {...props.checkbox} {...props.labeled} component={Checkbox} />
    <Labeled
      {...props.checkbox}
      {...props.labeled}
      component={Checkbox}
      defaultIndeterminate
    />
    <Labeled
      {...props.checkbox}
      {...props.labeled}
      component={Checkbox}
      defaultChecked
    />
  </div>
);
