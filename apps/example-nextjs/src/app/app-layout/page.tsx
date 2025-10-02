import {
  AppLayout,
  AppLayoutBody,
  AppLayoutNavigationDrawer,
  AppLayoutNavigationRail,
  AppLayoutTopBar,
  Box,
  Flex,
  NavigationDrawerDestination,
  NavigationDrawerSection,
  NavigationRailDestination,
  Paper,
  SimpleGrid,
} from '@sixui/core';

const PageLayoutRoute: React.FC = () => (
  <AppLayout defaultComponentSet={['topBar', 'navigationDrawer']}>
    <Flex direction="column">
      <AppLayoutTopBar headline="Sixui Demo" divider wide />

      <Flex direction="row" align="start">
        <AppLayoutNavigationRail divider>
          <NavigationRailDestination icon="x" href="/" label="Accueil" />
        </AppLayoutNavigationRail>

        <AppLayoutNavigationDrawer divider>
          <NavigationDrawerSection headline="Section">
            <NavigationDrawerDestination leadingIcon="x" href="/">
              Accueil
            </NavigationDrawerDestination>
          </NavigationDrawerSection>
        </AppLayoutNavigationDrawer>

        <AppLayoutBody>
          <Box w="100%">
            <SimpleGrid
              cols={{
                compact: 4,
                medium: 6,
                expanded: 8,
                large: 10,
                extraLarge: 12,
              }}
            >
              {Array.from({ length: 32 }).map((_, index) => (
                <Paper
                  as={Flex}
                  key={index}
                  surface="$surfaceContainerHighest"
                  w="64px"
                  h="64px"
                  align="center"
                  justify="center"
                >
                  {index + 1}
                </Paper>
              ))}
            </SimpleGrid>
          </Box>
        </AppLayoutBody>
      </Flex>
    </Flex>
  </AppLayout>
);

export default PageLayoutRoute;
