import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import { Checkbox, type ICheckboxOwnProps } from '~/components/Checkbox';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';
import { commonStyles } from '~/helpers/commonStyles';

export type ICheckboxPlaygroundDemoProps = {
  checkbox: IOmit<ICheckboxOwnProps, 'styles'>;
  labeled: IOmit<ILabeledOwnProps, 'styles'>;
};

export const CheckboxPlaygroundDemo: React.FC<ICheckboxPlaygroundDemoProps> = (
  props,
) => (
  <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$xl)}>
    <Labeled {...props.checkbox} {...props.labeled} as={Checkbox} />
    <Labeled
      {...props.checkbox}
      {...props.labeled}
      as={Checkbox}
      defaultIndeterminate
    />
    <Labeled
      {...props.checkbox}
      {...props.labeled}
      as={Checkbox}
      defaultChecked
    />
  </div>
);
