import { addons, types } from '@storybook/manager-api';

import { Panel } from './components/Panel';
import { Tool } from './components/Tool';
import { ADDON_ID, PANEL_ID } from './constants';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'React hook form',
    render: Panel,
  });
  addons.add(PANEL_ID, {
    type: types.TOOL,
    title: 'React hook form',
    render: Tool,
  });
});
