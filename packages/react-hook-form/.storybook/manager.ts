import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

import { PANEL_ID } from './addon-react-hook-form/constants';

addons.setConfig({
  theme: themes.light,
  selectedPanel: PANEL_ID,
});
