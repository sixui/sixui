import stylex from '@stylexjs/stylex';

import type { IOmit } from '~/helpers/types';
import { Switch, type ISwitchOwnProps } from '~/components/Switch';
import { Labeled, type ILabeledOwnProps } from '~/components/Labeled';
import { commonStyles } from '~/helpers/commonStyles';

export type ISwitchPlaygroundDemoProps = {
  switch: IOmit<ISwitchOwnProps, 'styles'>;
  labeled: IOmit<ILabeledOwnProps, 'styles'>;
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
