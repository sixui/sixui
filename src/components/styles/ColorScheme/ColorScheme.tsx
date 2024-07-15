import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { colorPalettesTokens } from '@/themes/base/tokens/colorPalettes.stylex';
import { ColorBox } from './ColorBox';

export type IColorSchemeProps = Record<string, never>;

const styles = stylex.create({
  host: {
    fontFamily: typescaleTokens.labelFont$sm,
    fontSize: typescaleTokens.labelSize$sm,
    fontWeight: typescaleTokens.labelWeight$sm,
    lineHeight: typescaleTokens.labelLineHeight$sm,
    letterSpacing: typescaleTokens.labelLetterSpacing$sm,
  },
  flex: {
    display: 'flex',
  },
  flexCol: {
    flexDirection: 'column',
  },
  grow: {
    flexGrow: 1,
    flexBasis: 0,
  },
  gapX$sm: {
    columnGap: '0.25rem',
  },
  gapX$lg: {
    columnGap: '1rem',
  },
  gapY$sm: {
    rowGap: '0.25rem',
  },
  gapY$lg: {
    rowGap: '1rem',
  },
  width$sm: {
    width: 200,
  },
  width$lg: {
    width: 600,
  },
});

export const ColorScheme: React.FC<IColorSchemeProps> = () => {
  return (
    <div {...stylex.props(styles.host)}>
      <div {...stylex.props(styles.flex, styles.flexCol, styles.gapY$lg)}>
        {/* Row 1 */}
        <div {...stylex.props(styles.flex, styles.flexCol, styles.gapY$sm)}>
          <div {...stylex.props(styles.flex, styles.gapX$lg)}>
            <div
              {...stylex.props(styles.flex, styles.gapX$sm, styles.width$lg)}
            >
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Primary'
                  size='md'
                  backgroundColor={colorRolesTokens.primary}
                  textColor={colorRolesTokens.onPrimary}
                />
                <ColorBox
                  label='On Primary'
                  size='sm'
                  backgroundColor={colorRolesTokens.onPrimary}
                  textColor={colorRolesTokens.primary}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Secondary'
                  size='md'
                  backgroundColor={colorRolesTokens.secondary}
                  textColor={colorRolesTokens.onSecondary}
                />
                <ColorBox
                  label='On Secondary'
                  size='sm'
                  backgroundColor={colorRolesTokens.onSecondary}
                  textColor={colorRolesTokens.secondary}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Tertiary'
                  size='md'
                  backgroundColor={colorRolesTokens.tertiary}
                  textColor={colorRolesTokens.onTertiary}
                />
                <ColorBox
                  label='On Tertiary'
                  size='sm'
                  backgroundColor={colorRolesTokens.onTertiary}
                  textColor={colorRolesTokens.tertiary}
                />
              </div>
            </div>
            <div
              {...stylex.props(styles.flex, styles.flexCol, styles.width$sm)}
            >
              <ColorBox
                label='Error'
                size='md'
                backgroundColor={colorRolesTokens.error}
                textColor={colorRolesTokens.onError}
              />
              <ColorBox
                label='On Error'
                size='sm'
                backgroundColor={colorRolesTokens.onError}
                textColor={colorRolesTokens.error}
              />
            </div>
          </div>

          <div {...stylex.props(styles.flex, styles.gapX$lg)}>
            <div
              {...stylex.props(styles.flex, styles.gapX$sm, styles.width$lg)}
            >
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Primary Container'
                  size='md'
                  backgroundColor={colorRolesTokens.primaryContainer}
                  textColor={colorRolesTokens.onPrimaryContainer}
                />
                <ColorBox
                  label='On Primary Container'
                  size='sm'
                  backgroundColor={colorRolesTokens.onPrimaryContainer}
                  textColor={colorRolesTokens.primaryContainer}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Secondary Container'
                  size='md'
                  backgroundColor={colorRolesTokens.secondaryContainer}
                  textColor={colorRolesTokens.onSecondaryContainer}
                />
                <ColorBox
                  label='On Secondary Container'
                  size='sm'
                  backgroundColor={colorRolesTokens.onSecondaryContainer}
                  textColor={colorRolesTokens.secondaryContainer}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Tertiary Container'
                  size='md'
                  backgroundColor={colorRolesTokens.tertiaryContainer}
                  textColor={colorRolesTokens.onTertiaryContainer}
                />
                <ColorBox
                  label='On Tertiary Container'
                  size='sm'
                  backgroundColor={colorRolesTokens.onTertiaryContainer}
                  textColor={colorRolesTokens.tertiaryContainer}
                />
              </div>
            </div>
            <div
              {...stylex.props(styles.flex, styles.flexCol, styles.width$sm)}
            >
              <ColorBox
                label='Error Container'
                size='md'
                backgroundColor={colorRolesTokens.errorContainer}
                textColor={colorRolesTokens.onErrorContainer}
              />
              <ColorBox
                label='On Error Container'
                size='sm'
                backgroundColor={colorRolesTokens.onErrorContainer}
                textColor={colorRolesTokens.errorContainer}
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div {...stylex.props(styles.flex, styles.flexCol)}>
          <div {...stylex.props(styles.flex, styles.gapX$lg)}>
            <div
              {...stylex.props(styles.flex, styles.gapX$sm, styles.width$lg)}
            >
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <div {...stylex.props(styles.flex, styles.grow)}>
                  <ColorBox
                    label='Primary Fixed'
                    size='md'
                    backgroundColor={colorRolesTokens.primaryFixed}
                    textColor={colorRolesTokens.onPrimaryFixed}
                  />
                  <ColorBox
                    label='Primary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesTokens.primaryFixedDim}
                    textColor={colorRolesTokens.onPrimaryFixed}
                  />
                </div>
                <ColorBox
                  label='On Primary Fixed'
                  size='xs'
                  backgroundColor={colorRolesTokens.onPrimaryFixed}
                  textColor={colorRolesTokens.primaryFixed}
                />
                <ColorBox
                  label='On Primary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesTokens.onPrimaryFixedVariant}
                  textColor={colorRolesTokens.primaryFixed}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <div {...stylex.props(styles.flex, styles.grow)}>
                  <ColorBox
                    label='Secondary Fixed'
                    size='md'
                    backgroundColor={colorRolesTokens.secondaryFixed}
                    textColor={colorRolesTokens.onSecondaryFixed}
                  />
                  <ColorBox
                    label='Secondary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesTokens.secondaryFixedDim}
                    textColor={colorRolesTokens.onSecondaryFixed}
                  />
                </div>
                <ColorBox
                  label='On Secondary Fixed'
                  size='xs'
                  backgroundColor={colorRolesTokens.onSecondaryFixed}
                  textColor={colorRolesTokens.secondaryFixed}
                />
                <ColorBox
                  label='On Secondary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesTokens.onSecondaryFixedVariant}
                  textColor={colorRolesTokens.secondaryFixed}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <div {...stylex.props(styles.flex, styles.grow)}>
                  <ColorBox
                    label='Tertiary Fixed'
                    size='md'
                    backgroundColor={colorRolesTokens.tertiaryFixed}
                    textColor={colorRolesTokens.onTertiaryFixed}
                  />
                  <ColorBox
                    label='Tertiary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesTokens.tertiaryFixedDim}
                    textColor={colorRolesTokens.onTertiaryFixed}
                  />
                </div>
                <ColorBox
                  label='On Tertiary Fixed'
                  size='xs'
                  backgroundColor={colorRolesTokens.onTertiaryFixed}
                  textColor={colorRolesTokens.tertiaryFixed}
                />
                <ColorBox
                  label='On Tertiary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesTokens.onTertiaryFixedVariant}
                  textColor={colorRolesTokens.tertiaryFixed}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div {...stylex.props(styles.flex, styles.flexCol, styles.gapY$sm)}>
          <div {...stylex.props(styles.flex, styles.gapX$lg)}>
            <div
              {...stylex.props(
                styles.flex,
                styles.flexCol,
                styles.gapY$sm,
                styles.width$lg,
              )}
            >
              <div {...stylex.props(styles.flex, styles.grow)}>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Dim'
                    size='lg'
                    backgroundColor={colorRolesTokens.surfaceDim}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface'
                    size='lg'
                    backgroundColor={colorRolesTokens.surface}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Bright'
                    size='lg'
                    backgroundColor={colorRolesTokens.surfaceBright}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
              </div>
              <div {...stylex.props(styles.flex, styles.grow)}>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container Lowest'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainerLowest}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container Low'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainerLow}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainer}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container High'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainerHigh}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container Highest'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainerHighest}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
              </div>
            </div>

            <div
              {...stylex.props(
                styles.flex,
                styles.flexCol,
                styles.gapY$sm,
                styles.width$sm,
              )}
            >
              <div {...stylex.props(styles.flex, styles.flexCol)}>
                <ColorBox
                  label='Inverse Surface'
                  size='md'
                  backgroundColor={colorRolesTokens.inverseSurface}
                  textColor={colorRolesTokens.inverseOnSurface}
                />
                <ColorBox
                  label='Inverse On Surface'
                  size='sm'
                  backgroundColor={colorRolesTokens.inverseOnSurface}
                  textColor={colorRolesTokens.inverseSurface}
                />
              </div>

              <ColorBox
                label='Inverse Primary'
                size='sm'
                backgroundColor={colorRolesTokens.inversePrimary}
                textColor={colorRolesTokens.onPrimaryContainer}
              />
            </div>
          </div>

          <div {...stylex.props(styles.flex, styles.gapX$lg)}>
            <div
              {...stylex.props(
                styles.flex,
                styles.flexCol,
                styles.gapY$sm,
                styles.width$lg,
              )}
            >
              <div {...stylex.props(styles.flex, styles.grow)}>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='On Surface'
                    size='sm'
                    backgroundColor={colorRolesTokens.onSurface}
                    textColor={colorRolesTokens.surface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='On Surface Variant'
                    size='sm'
                    backgroundColor={colorRolesTokens.onSurfaceVariant}
                    textColor={colorRolesTokens.surface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Outline'
                    size='sm'
                    backgroundColor={colorRolesTokens.outline}
                    textColor={colorRolesTokens.surface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Outline Variant'
                    size='sm'
                    backgroundColor={colorRolesTokens.outlineVariant}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
              </div>
            </div>
            <div
              {...stylex.props(styles.flex, styles.gapX$lg, styles.width$sm)}
            >
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Scrim'
                  size='sm'
                  backgroundColor={colorRolesTokens.scrim}
                  textColor={colorPalettesTokens.white}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Shadow'
                  size='sm'
                  backgroundColor={colorRolesTokens.scrim}
                  textColor={colorPalettesTokens.white}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
