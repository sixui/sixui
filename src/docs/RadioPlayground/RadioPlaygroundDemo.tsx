import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import { RadioGroup } from '~/components/RadioGroup';
import { Radio, type IRadioOwnProps } from '~/components/Radio';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';
import { commonStyles } from '~/helpers/commonStyles';

export type IRadioPlaygroundDemoProps = {
  radio: IOmit<IRadioOwnProps, 'styles'>;
  labeled: IOmit<ILabeledOwnProps, 'styles'>;
};

export const RadioPlaygroundDemo: React.FC<IRadioPlaygroundDemoProps> = (
  props,
) => (
  <RadioGroup>
    <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$lg)}>
      <Labeled {...props.radio} {...props.labeled} value='1' as={Radio} />
      <Labeled {...props.radio} {...props.labeled} value='2' as={Radio} />
      <Labeled {...props.radio} {...props.labeled} value='3' as={Radio} />
    </div>
  </RadioGroup>
);
