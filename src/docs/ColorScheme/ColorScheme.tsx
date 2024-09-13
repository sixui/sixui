import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

import type { IColorSchemeProps } from './ColorScheme.types';
import { tonalPalettesTokens } from '~/themes/base/tonalPalettes.stylex';
import { Stack } from '~/components/Stack';
import { Text } from '~/components/Text';
import { ColorRole } from './ColorRole';
import { colorSchemeStyles } from './ColorScheme.styles';

export const ColorScheme: React.FC<IColorSchemeProps> = () => {
  return (
    <Text as='div' variant='label' scale='sm'>
      <Stack gap={4}>
        {/* Row 1 */}
        <Stack gap={1}>
          <Stack horizontal gap={4}>
            <Stack horizontal gap={1} sx={colorSchemeStyles.width$lg}>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Primary'
                  size='md'
                  backgroundColor={colorSchemeTokens.primary}
                  textColor={colorSchemeTokens.onPrimary}
                />
                <ColorRole
                  label='On Primary'
                  size='sm'
                  backgroundColor={colorSchemeTokens.onPrimary}
                  textColor={colorSchemeTokens.primary}
                />
              </Stack>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Secondary'
                  size='md'
                  backgroundColor={colorSchemeTokens.secondary}
                  textColor={colorSchemeTokens.onSecondary}
                />
                <ColorRole
                  label='On Secondary'
                  size='sm'
                  backgroundColor={colorSchemeTokens.onSecondary}
                  textColor={colorSchemeTokens.secondary}
                />
              </Stack>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Tertiary'
                  size='md'
                  backgroundColor={colorSchemeTokens.tertiary}
                  textColor={colorSchemeTokens.onTertiary}
                />
                <ColorRole
                  label='On Tertiary'
                  size='sm'
                  backgroundColor={colorSchemeTokens.onTertiary}
                  textColor={colorSchemeTokens.tertiary}
                />
              </Stack>
            </Stack>
            <Stack sx={colorSchemeStyles.width$sm}>
              <ColorRole
                label='Error'
                size='md'
                backgroundColor={colorSchemeTokens.error}
                textColor={colorSchemeTokens.onError}
              />
              <ColorRole
                label='On Error'
                size='sm'
                backgroundColor={colorSchemeTokens.onError}
                textColor={colorSchemeTokens.error}
              />
            </Stack>
          </Stack>

          <Stack horizontal gap={4}>
            <Stack gap={1} horizontal sx={colorSchemeStyles.width$lg}>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Primary Container'
                  size='md'
                  backgroundColor={colorSchemeTokens.primaryContainer}
                  textColor={colorSchemeTokens.onPrimaryContainer}
                />
                <ColorRole
                  label='On Primary Container'
                  size='sm'
                  backgroundColor={colorSchemeTokens.onPrimaryContainer}
                  textColor={colorSchemeTokens.primaryContainer}
                />
              </Stack>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Secondary Container'
                  size='md'
                  backgroundColor={colorSchemeTokens.secondaryContainer}
                  textColor={colorSchemeTokens.onSecondaryContainer}
                />
                <ColorRole
                  label='On Secondary Container'
                  size='sm'
                  backgroundColor={colorSchemeTokens.onSecondaryContainer}
                  textColor={colorSchemeTokens.secondaryContainer}
                />
              </Stack>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Tertiary Container'
                  size='md'
                  backgroundColor={colorSchemeTokens.tertiaryContainer}
                  textColor={colorSchemeTokens.onTertiaryContainer}
                />
                <ColorRole
                  label='On Tertiary Container'
                  size='sm'
                  backgroundColor={colorSchemeTokens.onTertiaryContainer}
                  textColor={colorSchemeTokens.tertiaryContainer}
                />
              </Stack>
            </Stack>
            <Stack sx={colorSchemeStyles.width$sm}>
              <ColorRole
                label='Error Container'
                size='md'
                backgroundColor={colorSchemeTokens.errorContainer}
                textColor={colorSchemeTokens.onErrorContainer}
              />
              <ColorRole
                label='On Error Container'
                size='sm'
                backgroundColor={colorSchemeTokens.onErrorContainer}
                textColor={colorSchemeTokens.errorContainer}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Row 2 */}
        <Stack>
          <Stack horizontal gap={4}>
            <Stack horizontal gap={1} sx={colorSchemeStyles.width$lg}>
              <Stack sx={colorSchemeStyles.grow}>
                <Stack horizontal sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Primary Fixed'
                    size='md'
                    backgroundColor={colorSchemeTokens.primaryFixed}
                    textColor={colorSchemeTokens.onPrimaryFixed}
                  />
                  <ColorRole
                    label='Primary Fixed Dim'
                    size='md'
                    backgroundColor={colorSchemeTokens.primaryFixedDim}
                    textColor={colorSchemeTokens.onPrimaryFixed}
                  />
                </Stack>
                <ColorRole
                  label='On Primary Fixed'
                  size='xs'
                  backgroundColor={colorSchemeTokens.onPrimaryFixed}
                  textColor={colorSchemeTokens.primaryFixed}
                />
                <ColorRole
                  label='On Primary Fixed Variant'
                  size='xs'
                  backgroundColor={colorSchemeTokens.onPrimaryFixedVariant}
                  textColor={colorSchemeTokens.primaryFixed}
                />
              </Stack>
              <Stack sx={colorSchemeStyles.grow}>
                <Stack horizontal sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Secondary Fixed'
                    size='md'
                    backgroundColor={colorSchemeTokens.secondaryFixed}
                    textColor={colorSchemeTokens.onSecondaryFixed}
                  />
                  <ColorRole
                    label='Secondary Fixed Dim'
                    size='md'
                    backgroundColor={colorSchemeTokens.secondaryFixedDim}
                    textColor={colorSchemeTokens.onSecondaryFixed}
                  />
                </Stack>
                <ColorRole
                  label='On Secondary Fixed'
                  size='xs'
                  backgroundColor={colorSchemeTokens.onSecondaryFixed}
                  textColor={colorSchemeTokens.secondaryFixed}
                />
                <ColorRole
                  label='On Secondary Fixed Variant'
                  size='xs'
                  backgroundColor={colorSchemeTokens.onSecondaryFixedVariant}
                  textColor={colorSchemeTokens.secondaryFixed}
                />
              </Stack>
              <Stack sx={colorSchemeStyles.grow}>
                <Stack horizontal sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Tertiary Fixed'
                    size='md'
                    backgroundColor={colorSchemeTokens.tertiaryFixed}
                    textColor={colorSchemeTokens.onTertiaryFixed}
                  />
                  <ColorRole
                    label='Tertiary Fixed Dim'
                    size='md'
                    backgroundColor={colorSchemeTokens.tertiaryFixedDim}
                    textColor={colorSchemeTokens.onTertiaryFixed}
                  />
                </Stack>
                <ColorRole
                  label='On Tertiary Fixed'
                  size='xs'
                  backgroundColor={colorSchemeTokens.onTertiaryFixed}
                  textColor={colorSchemeTokens.tertiaryFixed}
                />
                <ColorRole
                  label='On Tertiary Fixed Variant'
                  size='xs'
                  backgroundColor={colorSchemeTokens.onTertiaryFixedVariant}
                  textColor={colorSchemeTokens.tertiaryFixed}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Row 3 */}
        <Stack gap={1}>
          <Stack horizontal gap={4} align='stretch'>
            <Stack gap={1} sx={colorSchemeStyles.width$lg}>
              <Stack horizontal sx={colorSchemeStyles.grow}>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface Dim'
                    size='lg'
                    backgroundColor={colorSchemeTokens.surfaceDim}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface'
                    size='lg'
                    backgroundColor={colorSchemeTokens.surface}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface Bright'
                    size='lg'
                    backgroundColor={colorSchemeTokens.surfaceBright}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
              </Stack>
              <Stack horizontal sx={colorSchemeStyles.grow}>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface Container Lowest'
                    size='xl'
                    backgroundColor={colorSchemeTokens.surfaceContainerLowest}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface Container Low'
                    size='xl'
                    backgroundColor={colorSchemeTokens.surfaceContainerLow}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface Container'
                    size='xl'
                    backgroundColor={colorSchemeTokens.surfaceContainer}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface Container High'
                    size='xl'
                    backgroundColor={colorSchemeTokens.surfaceContainerHigh}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Surface Container Highest'
                    size='xl'
                    backgroundColor={colorSchemeTokens.surfaceContainerHighest}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack gap={1} sx={colorSchemeStyles.width$sm}>
              <Stack>
                <ColorRole
                  label='Inverse Surface'
                  size='md'
                  backgroundColor={colorSchemeTokens.inverseSurface}
                  textColor={colorSchemeTokens.inverseOnSurface}
                />
                <ColorRole
                  label='Inverse On Surface'
                  size='sm'
                  backgroundColor={colorSchemeTokens.inverseOnSurface}
                  textColor={colorSchemeTokens.inverseSurface}
                />
              </Stack>

              <ColorRole
                label='Inverse Primary'
                size='sm'
                backgroundColor={colorSchemeTokens.inversePrimary}
                textColor={colorSchemeTokens.onPrimaryContainer}
              />
            </Stack>
          </Stack>

          <Stack horizontal gap={4}>
            <Stack gap={1} sx={colorSchemeStyles.width$lg}>
              <Stack horizontal sx={colorSchemeStyles.grow}>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='On Surface'
                    size='sm'
                    backgroundColor={colorSchemeTokens.onSurface}
                    textColor={colorSchemeTokens.surface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='On Surface Variant'
                    size='sm'
                    backgroundColor={colorSchemeTokens.onSurfaceVariant}
                    textColor={colorSchemeTokens.surface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Outline'
                    size='sm'
                    backgroundColor={colorSchemeTokens.outline}
                    textColor={colorSchemeTokens.surface}
                  />
                </Stack>
                <Stack sx={colorSchemeStyles.grow}>
                  <ColorRole
                    label='Outline Variant'
                    size='sm'
                    backgroundColor={colorSchemeTokens.outlineVariant}
                    textColor={colorSchemeTokens.onSurface}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack horizontal gap={4} sx={colorSchemeStyles.width$sm}>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Scrim'
                  size='sm'
                  backgroundColor={colorSchemeTokens.scrim}
                  textColor={tonalPalettesTokens.white}
                />
              </Stack>
              <Stack sx={colorSchemeStyles.grow}>
                <ColorRole
                  label='Shadow'
                  size='sm'
                  backgroundColor={colorSchemeTokens.scrim}
                  textColor={tonalPalettesTokens.white}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Text>
  );
};
