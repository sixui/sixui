import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import { RadioGroup } from '~/components/RadioGroup';
import { Radio, type IRadioOwnProps } from '~/components/Radio';
import { Labeled } from '~/components/Labeled';
import { commonStyles } from '~/helpers/commonStyles';

export type IRadioPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  radio: IOmit<IRadioOwnProps, 'styles'>;
};

export const RadioPlaygroundDemo: React.FC<IRadioPlaygroundDemoProps> = (
  props,
) => (
  <RadioGroup>
    <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$lg)}>
      <Labeled
        {...props.radio}
        {...props.labeled}
        value='1'
        component={Radio}
      />
      <Labeled
        {...props.radio}
        {...props.labeled}
        value='2'
        component={Radio}
      />
      <Labeled
        {...props.radio}
        {...props.labeled}
        value='3'
        component={Radio}
      />
    </div>
  </RadioGroup>
);
