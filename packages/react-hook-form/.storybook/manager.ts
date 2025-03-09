import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.light,
  showToolbar: false,
});

addons.register('custom-panel', (api) => {
  api.togglePanel(false);
});
