import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import { commonStyles } from '~/helpers/commonStyles';
import { Switch, type ISwitchProps } from '~/components/Switch';
import { Labeled } from '~/components/Labeled';

export type ISwitchPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  switch: IOmit<ISwitchProps, 'styles'>;
};

export const SwitchPlaygroundDemo: React.FC<ISwitchPlaygroundDemoProps> = (
  props,
) => (
  <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$lg)}>
    <Labeled {...props.switch} {...props.labeled}>
      <Switch />
    </Labeled>
    <Labeled {...props.switch} {...props.labeled}>
      <Switch defaultChecked />
    </Labeled>
    <Labeled {...props.switch} {...props.labeled}>
      <Switch defaultChecked icons />
    </Labeled>
  </div>
);
