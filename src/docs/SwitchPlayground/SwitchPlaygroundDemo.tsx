import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import { Switch, type ISwitchOwnProps } from '~/components/Switch';
import { Labeled } from '~/components/Labeled';
import { commonStyles } from '~/helpers/commonStyles';

export type ISwitchPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  switch: IOmit<ISwitchOwnProps, 'styles'>;
};

export const SwitchPlaygroundDemo: React.FC<ISwitchPlaygroundDemoProps> = (
  props,
) => (
  <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$lg)}>
    <Labeled {...props.switch} {...props.labeled} as={Switch} />
    <Labeled {...props.switch} {...props.labeled} as={Switch} defaultChecked />
    <Labeled
      {...props.switch}
      {...props.labeled}
      as={Switch}
      defaultChecked
      icons
    />
  </div>
);
