import type { IColorSchemeThemeFactory } from './ColorScheme.css';
import type { IColorSchemeFactory } from './ColorScheme.types';
import { Flex } from '~/components/Flex';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorScheme.constants';
import { ColorSchemeRole } from './ColorSchemeRole';
import { colorSchemeTheme } from './ColorScheme.css';

export const ColorScheme = componentFactory<IColorSchemeFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IColorSchemeThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorSchemeTheme,
    });

    return (
      <Flex direction="column" gap="$4" ref={forwardedRef} {...other}>
        {/* Row 1 */}
        <Flex direction="column" gap="$1">
          <Flex direction="row" gap="$4">
            <Flex direction="row" gap="$1" {...getStyles('lg')}>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Primary"
                  size="md"
                  surface="$primary"
                  c="$onPrimary"
                />
                <ColorSchemeRole
                  label="On Primary"
                  size="sm"
                  surface="$onPrimary"
                  c="$primary"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Secondary"
                  size="md"
                  surface="$secondary"
                  c="$onSecondary"
                />
                <ColorSchemeRole
                  label="On Secondary"
                  size="sm"
                  surface="$onSecondary"
                  c="$secondary"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Tertiary"
                  size="md"
                  surface="$tertiary"
                  c="$onTertiary"
                />
                <ColorSchemeRole
                  label="On Tertiary"
                  size="sm"
                  surface="$onTertiary"
                  c="$tertiary"
                />
              </Flex>
            </Flex>
            <Flex direction="column" {...getStyles('sm')}>
              <ColorSchemeRole
                label="Error"
                size="md"
                surface="$error"
                c="$onError"
              />
              <ColorSchemeRole
                label="On Error"
                size="sm"
                surface="$onError"
                c="$error"
              />
            </Flex>
          </Flex>

          <Flex direction="row" gap="$4">
            <Flex direction="row" gap="$1" {...getStyles('lg')}>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Primary Container"
                  size="md"
                  surface="$primaryContainer"
                  c="$onPrimaryContainer"
                />
                <ColorSchemeRole
                  label="On Primary Container"
                  size="sm"
                  surface="$onPrimaryContainer"
                  c="$primaryContainer"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Secondary Container"
                  size="md"
                  surface="$secondaryContainer"
                  c="$onSecondaryContainer"
                />
                <ColorSchemeRole
                  label="On Secondary Container"
                  size="sm"
                  surface="$onSecondaryContainer"
                  c="$secondaryContainer"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Tertiary Container"
                  size="md"
                  surface="$tertiaryContainer"
                  c="$onTertiaryContainer"
                />
                <ColorSchemeRole
                  label="On Tertiary Container"
                  size="sm"
                  surface="$onTertiaryContainer"
                  c="$tertiaryContainer"
                />
              </Flex>
            </Flex>
            <Flex direction="column" {...getStyles('sm')}>
              <ColorSchemeRole
                label="Error Container"
                size="md"
                surface="$errorContainer"
                c="$onErrorContainer"
              />
              <ColorSchemeRole
                label="On Error Container"
                size="sm"
                surface="$onErrorContainer"
                c="$errorContainer"
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Row 2 */}
        <Flex>
          <Flex direction="row" gap="$4">
            <Flex direction="row" gap="$1" {...getStyles('lg')}>
              <Flex direction="column" flex={1}>
                <Flex direction="row" flex={1}>
                  <ColorSchemeRole
                    label="Primary Fixed"
                    size="md"
                    surface="$primaryFixed"
                    c="$onPrimaryFixed"
                  />
                  <ColorSchemeRole
                    label="Primary Fixed Dim"
                    size="md"
                    surface="$primaryFixedDim"
                    c="$onPrimaryFixed"
                  />
                </Flex>
                <ColorSchemeRole
                  label="On Primary Fixed"
                  size="xs"
                  surface="$onPrimaryFixed"
                  c="$primaryFixed"
                />
                <ColorSchemeRole
                  label="On Primary Fixed Variant"
                  size="xs"
                  surface="$onPrimaryFixedVariant"
                  c="$primaryFixed"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <Flex direction="row" flex={1}>
                  <ColorSchemeRole
                    label="Secondary Fixed"
                    size="md"
                    surface="$secondaryFixed"
                    c="$onSecondaryFixed"
                  />
                  <ColorSchemeRole
                    label="Secondary Fixed Dim"
                    size="md"
                    surface="$secondaryFixedDim"
                    c="$onSecondaryFixed"
                  />
                </Flex>
                <ColorSchemeRole
                  label="On Secondary Fixed"
                  size="xs"
                  surface="$onSecondaryFixed"
                  c="$secondaryFixed"
                />
                <ColorSchemeRole
                  label="On Secondary Fixed Variant"
                  size="xs"
                  surface="$onSecondaryFixedVariant"
                  c="$secondaryFixed"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <Flex direction="row" flex={1}>
                  <ColorSchemeRole
                    label="Tertiary Fixed"
                    size="md"
                    surface="$tertiaryFixed"
                    c="$onTertiaryFixed"
                  />
                  <ColorSchemeRole
                    label="Tertiary Fixed Dim"
                    size="md"
                    surface="$tertiaryFixedDim"
                    c="$onTertiaryFixed"
                  />
                </Flex>
                <ColorSchemeRole
                  label="On Tertiary Fixed"
                  size="xs"
                  surface="$onTertiaryFixed"
                  c="$tertiaryFixed"
                />
                <ColorSchemeRole
                  label="On Tertiary Fixed Variant"
                  size="xs"
                  surface="$onTertiaryFixedVariant"
                  c="$tertiaryFixed"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Row 3 */}
        <Flex direction="column" gap="$1">
          <Flex direction="row" gap="$4" align="stretch">
            <Flex direction="column" gap="$1" {...getStyles('lg')}>
              <Flex direction="row" flex={1}>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface Dim"
                    size="lg"
                    surface="$surfaceDim"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface"
                    size="lg"
                    surface="$surface"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface Bright"
                    size="lg"
                    surface="$surfaceBright"
                    c="$onSurface"
                  />
                </Flex>
              </Flex>
              <Flex direction="row" flex={1}>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface Container Lowest"
                    size="xl"
                    surface="$surfaceContainerLowest"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface Container Low"
                    size="xl"
                    surface="$surfaceContainerLow"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface Container"
                    size="xl"
                    surface="$surfaceContainer"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface Container High"
                    size="xl"
                    surface="$surfaceContainerHigh"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Surface Container Highest"
                    size="xl"
                    surface="$surfaceContainerHighest"
                    c="$onSurface"
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex direction="column" gap="$1" {...getStyles('sm')}>
              <Flex direction="column">
                <ColorSchemeRole
                  label="Inverse Surface"
                  size="md"
                  surface="$inverseSurface"
                  c="$inverseOnSurface"
                />
                <ColorSchemeRole
                  label="Inverse On Surface"
                  size="sm"
                  surface="$inverseOnSurface"
                  c="$inverseSurface"
                />
              </Flex>

              <ColorSchemeRole
                label="Inverse Primary"
                size="sm"
                surface="$inversePrimary"
                c="$onPrimaryContainer"
              />
            </Flex>
          </Flex>

          <Flex direction="row" gap="$4">
            <Flex direction="column" gap="$1" {...getStyles('lg')}>
              <Flex direction="row" flex={1}>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="On Surface"
                    size="sm"
                    surface="$onSurface"
                    c="$surface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="On Surface Variant"
                    size="sm"
                    surface="$onSurfaceVariant"
                    c="$surface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Outline"
                    size="sm"
                    surface="$outline"
                    c="$surface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemeRole
                    label="Outline Variant"
                    size="sm"
                    surface="$outlineVariant"
                    c="$onSurface"
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="row" gap="$4" {...getStyles('sm')}>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Scrim"
                  size="sm"
                  surface="$scrim"
                  c="#ffffff"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemeRole
                  label="Shadow"
                  size="sm"
                  surface="$scrim"
                  c="#ffffff"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  },
);

ColorScheme.theme = colorSchemeTheme;
ColorScheme.displayName = `@sixui/${COMPONENT_NAME}`;
ColorScheme.Role = ColorSchemeRole;
