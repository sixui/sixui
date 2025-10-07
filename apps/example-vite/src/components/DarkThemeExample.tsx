import { Flex, Paper, Text, ThemeProvider } from '@sixui/core';

export const DarkThemeExample: React.FC = () => (
  <ThemeProvider forceColorScheme="dark">
    <Paper
      as={Flex}
      w="320px"
      h="160px"
      shape="$md"
      align="center"
      justify="center"
      surface="$surfaceContainerHigh"
      ta="center"
    >
      <Text>This text is nested in a dark color scheme ThemeProvider.</Text>
    </Paper>
  </ThemeProvider>
);
