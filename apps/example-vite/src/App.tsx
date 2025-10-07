import { Flex } from '@sixui/core';

import { ColorSchemeSwitch } from './components/ColorSchemeSwitch';
import { DarkThemeExample } from './components/DarkThemeExample';
import { DialogButton } from './components/DialogButton';

export const App: React.FC = () => (
  <Flex direction="column" p="$lg" align="center" justify="center" h="100vh">
    <Flex direction="column" gap="$lg">
      <ColorSchemeSwitch />
      <DialogButton />
      <DarkThemeExample />
    </Flex>
  </Flex>
);
