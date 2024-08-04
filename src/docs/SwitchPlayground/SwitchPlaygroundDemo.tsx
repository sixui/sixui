import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import type { ILabeledPlaygroundDemoProps } from '~/docs/LabeledPlayground/LabeledPlaygroundDemo';
import { commonStyles } from '~/helpers/commonStyles';
import { Switch, type ISwitchOwnProps } from '~/components/Switch';
import { Labeled } from '~/components/Labeled';

export type ISwitchPlaygroundDemoProps = ILabeledPlaygroundDemoProps & {
  switch: IOmit<ISwitchOwnProps, 'styles'>;
};

export const SwitchPlaygroundDemo: React.FC<ISwitchPlaygroundDemoProps> = (
  props,
) => (
  <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$lg)}>
    <Labeled {...props.switch} {...props.labeled} component={Switch} />
    <Labeled
      {...props.switch}
      {...props.labeled}
      component={Switch}
      defaultChecked
    />
    <Labeled
      {...props.switch}
      {...props.labeled}
      component={Switch}
      defaultChecked
      icons
    />
  </div>
);
