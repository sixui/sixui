import { Flex, ThemeProvider } from '@sixui/core';

import { Demo } from './Demo';

export const App: React.FC = () => (
  <Flex direction="row" w="100%" mih="100vh">
    <Demo />
    <ThemeProvider colorSchemeVariant="dark">
      <Demo />
    </ThemeProvider>
  </Flex>
);
