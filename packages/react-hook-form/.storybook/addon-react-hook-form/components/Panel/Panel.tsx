// eslint-disable-next-line
import React from 'react';
import { useAddonState, useChannel } from '@storybook/manager-api';
import { AddonPanel, TabsState } from 'storybook/internal/components';
import { useTheme } from 'storybook/internal/theming';

import { EVENTS } from '../../constants';
import { Tab } from '../Tab';

const countDefinedKeys = (obj: object): number =>
  Object.entries(obj).filter(([_key, value]) => value !== undefined).length;

export interface IPanelProps {
  active?: boolean;
}

export const Panel: React.FC<IPanelProps> = (props) => {
  const { active } = props;

  const theme = useTheme();
  const [values, setValues] = useAddonState<object>('values', {});
  const [dirty, setDirty] = useAddonState<object>('dirty', {});
  const [errors, setErrors] = useAddonState<object>('errors', {});

  useChannel({
    [EVENTS.RESULT]: (newValues: object) => {
      setValues(newValues);
    },
    [EVENTS.DIRTY]: (newDirty: object) => {
      setDirty(newDirty);
    },
    [EVENTS.ERROR]: (newErrors: object) => {
      setErrors(newErrors);
    },
  });

  const valuesCount = countDefinedKeys(values);
  const valuesTitle = `Values${valuesCount ? ` (${valuesCount})` : ''}`;

  const dirtyCount = countDefinedKeys(dirty);
  const dirtyTitle = `Dirty${dirtyCount ? ` (${dirtyCount})` : ''}`;

  const errorsCount = countDefinedKeys(errors);
  const errorsTitle = `Errors${errorsCount ? ` (${errorsCount})` : ''}`;

  return (
    <AddonPanel active={active ?? false}>
      <TabsState initial="values">
        <div id="values" title={valuesTitle} color={theme.color.positive}>
          <Tab json={values} />
        </div>
        <div id="dirty" title={dirtyTitle} color={theme.color.warning}>
          <Tab json={dirty} />
        </div>
        <div id="errors" title={errorsTitle} color={theme.color.negative}>
          <Tab json={errors} />
        </div>
      </TabsState>
    </AddonPanel>
  );
};
