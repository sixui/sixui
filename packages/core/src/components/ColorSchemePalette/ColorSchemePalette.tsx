import type { IColorSchemePaletteThemeFactory } from './ColorSchemePalette.css';
import type { IColorSchemePaletteFactory } from './ColorSchemePalette.types';
import { Flex } from '~/components/Flex';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorSchemePalette.constants';
import { ColorSchemePaletteColor } from './ColorSchemePaletteColor';
import { colorSchemePaletteTheme } from './ColorSchemePalette.css';

/**
 * @see https://m3.material.io/styles/color/overview
 */
export const ColorSchemePalette = componentFactory<IColorSchemePaletteFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IColorSchemePaletteThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorSchemePaletteTheme,
    });

    return (
      <Flex direction="column" gap="$lg" ref={forwardedRef} {...other}>
        {/* Row 1 */}
        <Flex direction="column" gap="$xs">
          <Flex direction="row" gap="$lg">
            <Flex direction="row" gap="$xs" {...getStyles('lg')}>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
                  label="Primary"
                  size="md"
                  surface="$primary"
                  c="$onPrimary"
                />
                <ColorSchemePaletteColor
                  label="On Primary"
                  size="sm"
                  surface="$onPrimary"
                  c="$primary"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
                  label="Secondary"
                  size="md"
                  surface="$secondary"
                  c="$onSecondary"
                />
                <ColorSchemePaletteColor
                  label="On Secondary"
                  size="sm"
                  surface="$onSecondary"
                  c="$secondary"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
                  label="Tertiary"
                  size="md"
                  surface="$tertiary"
                  c="$onTertiary"
                />
                <ColorSchemePaletteColor
                  label="On Tertiary"
                  size="sm"
                  surface="$onTertiary"
                  c="$tertiary"
                />
              </Flex>
            </Flex>
            <Flex direction="column" {...getStyles('sm')}>
              <ColorSchemePaletteColor
                label="Error"
                size="md"
                surface="$error"
                c="$onError"
              />
              <ColorSchemePaletteColor
                label="On Error"
                size="sm"
                surface="$onError"
                c="$error"
              />
            </Flex>
          </Flex>

          <Flex direction="row" gap="$lg">
            <Flex direction="row" gap="$xs" {...getStyles('lg')}>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
                  label="Primary Container"
                  size="md"
                  surface="$primaryContainer"
                  c="$onPrimaryContainer"
                />
                <ColorSchemePaletteColor
                  label="On Primary Container"
                  size="sm"
                  surface="$onPrimaryContainer"
                  c="$primaryContainer"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
                  label="Secondary Container"
                  size="md"
                  surface="$secondaryContainer"
                  c="$onSecondaryContainer"
                />
                <ColorSchemePaletteColor
                  label="On Secondary Container"
                  size="sm"
                  surface="$onSecondaryContainer"
                  c="$secondaryContainer"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
                  label="Tertiary Container"
                  size="md"
                  surface="$tertiaryContainer"
                  c="$onTertiaryContainer"
                />
                <ColorSchemePaletteColor
                  label="On Tertiary Container"
                  size="sm"
                  surface="$onTertiaryContainer"
                  c="$tertiaryContainer"
                />
              </Flex>
            </Flex>
            <Flex direction="column" {...getStyles('sm')}>
              <ColorSchemePaletteColor
                label="Error Container"
                size="md"
                surface="$errorContainer"
                c="$onErrorContainer"
              />
              <ColorSchemePaletteColor
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
          <Flex direction="row" gap="$lg">
            <Flex direction="row" gap="$xs" {...getStyles('lg')}>
              <Flex direction="column" flex={1}>
                <Flex direction="row" flex={1}>
                  <ColorSchemePaletteColor
                    label="Primary Fixed"
                    size="md"
                    surface="$primaryFixed"
                    c="$onPrimaryFixed"
                  />
                  <ColorSchemePaletteColor
                    label="Primary Fixed Dim"
                    size="md"
                    surface="$primaryFixedDim"
                    c="$onPrimaryFixed"
                  />
                </Flex>
                <ColorSchemePaletteColor
                  label="On Primary Fixed"
                  size="xs"
                  surface="$onPrimaryFixed"
                  c="$primaryFixed"
                />
                <ColorSchemePaletteColor
                  label="On Primary Fixed Variant"
                  size="xs"
                  surface="$onPrimaryFixedVariant"
                  c="$primaryFixed"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <Flex direction="row" flex={1}>
                  <ColorSchemePaletteColor
                    label="Secondary Fixed"
                    size="md"
                    surface="$secondaryFixed"
                    c="$onSecondaryFixed"
                  />
                  <ColorSchemePaletteColor
                    label="Secondary Fixed Dim"
                    size="md"
                    surface="$secondaryFixedDim"
                    c="$onSecondaryFixed"
                  />
                </Flex>
                <ColorSchemePaletteColor
                  label="On Secondary Fixed"
                  size="xs"
                  surface="$onSecondaryFixed"
                  c="$secondaryFixed"
                />
                <ColorSchemePaletteColor
                  label="On Secondary Fixed Variant"
                  size="xs"
                  surface="$onSecondaryFixedVariant"
                  c="$secondaryFixed"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <Flex direction="row" flex={1}>
                  <ColorSchemePaletteColor
                    label="Tertiary Fixed"
                    size="md"
                    surface="$tertiaryFixed"
                    c="$onTertiaryFixed"
                  />
                  <ColorSchemePaletteColor
                    label="Tertiary Fixed Dim"
                    size="md"
                    surface="$tertiaryFixedDim"
                    c="$onTertiaryFixed"
                  />
                </Flex>
                <ColorSchemePaletteColor
                  label="On Tertiary Fixed"
                  size="xs"
                  surface="$onTertiaryFixed"
                  c="$tertiaryFixed"
                />
                <ColorSchemePaletteColor
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
        <Flex direction="column" gap="$xs">
          <Flex direction="row" gap="$lg" align="stretch">
            <Flex direction="column" gap="$xs" {...getStyles('lg')}>
              <Flex direction="row" flex={1}>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface Dim"
                    size="lg"
                    surface="$surfaceDim"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface"
                    size="lg"
                    surface="$surface"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface Bright"
                    size="lg"
                    surface="$surfaceBright"
                    c="$onSurface"
                  />
                </Flex>
              </Flex>
              <Flex direction="row" flex={1}>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface Container Lowest"
                    size="xl"
                    surface="$surfaceContainerLowest"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface Container Low"
                    size="xl"
                    surface="$surfaceContainerLow"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface Container"
                    size="xl"
                    surface="$surfaceContainer"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface Container High"
                    size="xl"
                    surface="$surfaceContainerHigh"
                    c="$onSurface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Surface Container Highest"
                    size="xl"
                    surface="$surfaceContainerHighest"
                    c="$onSurface"
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex direction="column" gap="$xs" {...getStyles('sm')}>
              <Flex direction="column">
                <ColorSchemePaletteColor
                  label="Inverse Surface"
                  size="md"
                  surface="$inverseSurface"
                  c="$inverseOnSurface"
                />
                <ColorSchemePaletteColor
                  label="Inverse On Surface"
                  size="sm"
                  surface="$inverseOnSurface"
                  c="$inverseSurface"
                />
              </Flex>

              <ColorSchemePaletteColor
                label="Inverse Primary"
                size="sm"
                surface="$inversePrimary"
                c="$onPrimaryContainer"
              />
            </Flex>
          </Flex>

          <Flex direction="row" gap="$lg">
            <Flex direction="column" gap="$xs" {...getStyles('lg')}>
              <Flex direction="row" flex={1}>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="On Surface"
                    size="sm"
                    surface="$onSurface"
                    c="$surface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="On Surface Variant"
                    size="sm"
                    surface="$onSurfaceVariant"
                    c="$surface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Outline"
                    size="sm"
                    surface="$outline"
                    c="$surface"
                  />
                </Flex>
                <Flex direction="column" flex={1}>
                  <ColorSchemePaletteColor
                    label="Outline Variant"
                    size="sm"
                    surface="$outlineVariant"
                    c="$onSurface"
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="row" gap="$lg" {...getStyles('sm')}>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
                  label="Scrim"
                  size="sm"
                  surface="$scrim"
                  c="#ffffff"
                />
              </Flex>
              <Flex direction="column" flex={1}>
                <ColorSchemePaletteColor
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

ColorSchemePalette.displayName = `@sixui/core/${COMPONENT_NAME}`;
ColorSchemePalette.theme = colorSchemePaletteTheme;
ColorSchemePalette.Role = ColorSchemePaletteColor;
