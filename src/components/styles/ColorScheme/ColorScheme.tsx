import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { colorPalettesVars } from '@/themes/base/vars/colorPalettes.stylex';
import { ColorBox } from './ColorBox';

export type IColorSchemeProps = Record<string, never>;

const styles = stylex.create({
  host: {
    fontFamily: typescaleVars.labelFont$sm,
    fontSize: typescaleVars.labelSize$sm,
    fontWeight: typescaleVars.labelWeight$sm,
    lineHeight: typescaleVars.labelLineHeight$sm,
    letterSpacing: typescaleVars.labelLetterSpacing$sm,
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
    width: '200px',
  },
  width$lg: {
    width: '600px',
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
                  backgroundColor={colorRolesVars.primary}
                  textColor={colorRolesVars.onPrimary}
                />
                <ColorBox
                  label='On Primary'
                  size='sm'
                  backgroundColor={colorRolesVars.onPrimary}
                  textColor={colorRolesVars.primary}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Secondary'
                  size='md'
                  backgroundColor={colorRolesVars.secondary}
                  textColor={colorRolesVars.onSecondary}
                />
                <ColorBox
                  label='On Secondary'
                  size='sm'
                  backgroundColor={colorRolesVars.onSecondary}
                  textColor={colorRolesVars.secondary}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Tertiary'
                  size='md'
                  backgroundColor={colorRolesVars.tertiary}
                  textColor={colorRolesVars.onTertiary}
                />
                <ColorBox
                  label='On Tertiary'
                  size='sm'
                  backgroundColor={colorRolesVars.onTertiary}
                  textColor={colorRolesVars.tertiary}
                />
              </div>
            </div>
            <div
              {...stylex.props(styles.flex, styles.flexCol, styles.width$sm)}
            >
              <ColorBox
                label='Error'
                size='md'
                backgroundColor={colorRolesVars.error}
                textColor={colorRolesVars.onError}
              />
              <ColorBox
                label='On Error'
                size='sm'
                backgroundColor={colorRolesVars.onError}
                textColor={colorRolesVars.error}
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
                  backgroundColor={colorRolesVars.primaryContainer}
                  textColor={colorRolesVars.onPrimaryContainer}
                />
                <ColorBox
                  label='On Primary Container'
                  size='sm'
                  backgroundColor={colorRolesVars.onPrimaryContainer}
                  textColor={colorRolesVars.primaryContainer}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Secondary Container'
                  size='md'
                  backgroundColor={colorRolesVars.secondaryContainer}
                  textColor={colorRolesVars.onSecondaryContainer}
                />
                <ColorBox
                  label='On Secondary Container'
                  size='sm'
                  backgroundColor={colorRolesVars.onSecondaryContainer}
                  textColor={colorRolesVars.secondaryContainer}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Tertiary Container'
                  size='md'
                  backgroundColor={colorRolesVars.tertiaryContainer}
                  textColor={colorRolesVars.onTertiaryContainer}
                />
                <ColorBox
                  label='On Tertiary Container'
                  size='sm'
                  backgroundColor={colorRolesVars.onTertiaryContainer}
                  textColor={colorRolesVars.tertiaryContainer}
                />
              </div>
            </div>
            <div
              {...stylex.props(styles.flex, styles.flexCol, styles.width$sm)}
            >
              <ColorBox
                label='Error Container'
                size='md'
                backgroundColor={colorRolesVars.errorContainer}
                textColor={colorRolesVars.onErrorContainer}
              />
              <ColorBox
                label='On Error Container'
                size='sm'
                backgroundColor={colorRolesVars.onErrorContainer}
                textColor={colorRolesVars.errorContainer}
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
                    backgroundColor={colorRolesVars.primaryFixed}
                    textColor={colorRolesVars.onPrimaryFixed}
                  />
                  <ColorBox
                    label='Primary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesVars.primaryFixedDim}
                    textColor={colorRolesVars.onPrimaryFixed}
                  />
                </div>
                <ColorBox
                  label='On Primary Fixed'
                  size='xs'
                  backgroundColor={colorRolesVars.onPrimaryFixed}
                  textColor={colorRolesVars.primaryFixed}
                />
                <ColorBox
                  label='On Primary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesVars.onPrimaryFixedVariant}
                  textColor={colorRolesVars.primaryFixed}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <div {...stylex.props(styles.flex, styles.grow)}>
                  <ColorBox
                    label='Secondary Fixed'
                    size='md'
                    backgroundColor={colorRolesVars.secondaryFixed}
                    textColor={colorRolesVars.onSecondaryFixed}
                  />
                  <ColorBox
                    label='Secondary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesVars.secondaryFixedDim}
                    textColor={colorRolesVars.onSecondaryFixed}
                  />
                </div>
                <ColorBox
                  label='On Secondary Fixed'
                  size='xs'
                  backgroundColor={colorRolesVars.onSecondaryFixed}
                  textColor={colorRolesVars.secondaryFixed}
                />
                <ColorBox
                  label='On Secondary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesVars.onSecondaryFixedVariant}
                  textColor={colorRolesVars.secondaryFixed}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <div {...stylex.props(styles.flex, styles.grow)}>
                  <ColorBox
                    label='Tertiary Fixed'
                    size='md'
                    backgroundColor={colorRolesVars.tertiaryFixed}
                    textColor={colorRolesVars.onTertiaryFixed}
                  />
                  <ColorBox
                    label='Tertiary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesVars.tertiaryFixedDim}
                    textColor={colorRolesVars.onTertiaryFixed}
                  />
                </div>
                <ColorBox
                  label='On Tertiary Fixed'
                  size='xs'
                  backgroundColor={colorRolesVars.onTertiaryFixed}
                  textColor={colorRolesVars.tertiaryFixed}
                />
                <ColorBox
                  label='On Tertiary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesVars.onTertiaryFixedVariant}
                  textColor={colorRolesVars.tertiaryFixed}
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
                    backgroundColor={colorRolesVars.surfaceDim}
                    textColor={colorRolesVars.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface'
                    size='lg'
                    backgroundColor={colorRolesVars.surface}
                    textColor={colorRolesVars.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Bright'
                    size='lg'
                    backgroundColor={colorRolesVars.surfaceBright}
                    textColor={colorRolesVars.onSurface}
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
                    backgroundColor={colorRolesVars.surfaceContainerLowest}
                    textColor={colorRolesVars.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container Low'
                    size='xl'
                    backgroundColor={colorRolesVars.surfaceContainerLow}
                    textColor={colorRolesVars.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container'
                    size='xl'
                    backgroundColor={colorRolesVars.surfaceContainer}
                    textColor={colorRolesVars.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container High'
                    size='xl'
                    backgroundColor={colorRolesVars.surfaceContainerHigh}
                    textColor={colorRolesVars.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Surface Container Highest'
                    size='xl'
                    backgroundColor={colorRolesVars.surfaceContainerHighest}
                    textColor={colorRolesVars.onSurface}
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
                  backgroundColor={colorRolesVars.inverseSurface}
                  textColor={colorRolesVars.inverseOnSurface}
                />
                <ColorBox
                  label='Inverse On Surface'
                  size='sm'
                  backgroundColor={colorRolesVars.inverseOnSurface}
                  textColor={colorRolesVars.inverseSurface}
                />
              </div>

              <ColorBox
                label='Inverse Primary'
                size='sm'
                backgroundColor={colorRolesVars.inversePrimary}
                textColor={colorRolesVars.onPrimaryContainer}
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
                    backgroundColor={colorRolesVars.onSurface}
                    textColor={colorRolesVars.surface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='On Surface Variant'
                    size='sm'
                    backgroundColor={colorRolesVars.onSurfaceVariant}
                    textColor={colorRolesVars.surface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Outline'
                    size='sm'
                    backgroundColor={colorRolesVars.outline}
                    textColor={colorRolesVars.surface}
                  />
                </div>
                <div
                  {...stylex.props(styles.flex, styles.flexCol, styles.grow)}
                >
                  <ColorBox
                    label='Outline Variant'
                    size='sm'
                    backgroundColor={colorRolesVars.outlineVariant}
                    textColor={colorRolesVars.onSurface}
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
                  backgroundColor={colorRolesVars.scrim}
                  textColor={colorPalettesVars.white}
                />
              </div>
              <div {...stylex.props(styles.flex, styles.flexCol, styles.grow)}>
                <ColorBox
                  label='Shadow'
                  size='sm'
                  backgroundColor={colorRolesVars.scrim}
                  textColor={colorPalettesVars.white}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
