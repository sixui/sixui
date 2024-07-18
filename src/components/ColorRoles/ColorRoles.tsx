import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';

import type { IColorRolesProps } from './ColorRoles.types';
import { tonalPalettesTokens } from '@/themes/base/tonalPalettes.stylex';
import { ColorRole } from './ColorRole';
import { colorRolesStyles } from './ColorRoles.styles';

export const ColorRoles: React.FC<IColorRolesProps> = () => {
  return (
    <div {...stylex.props(colorRolesStyles.host)}>
      <div
        {...stylex.props(
          colorRolesStyles.flex,
          colorRolesStyles.flexCol,
          colorRolesStyles.gapY$lg,
        )}
      >
        {/* Row 1 */}
        <div
          {...stylex.props(
            colorRolesStyles.flex,
            colorRolesStyles.flexCol,
            colorRolesStyles.gapY$sm,
          )}
        >
          <div
            {...stylex.props(colorRolesStyles.flex, colorRolesStyles.gapX$lg)}
          >
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.gapX$sm,
                colorRolesStyles.width$lg,
              )}
            >
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Primary'
                  size='md'
                  backgroundColor={colorRolesTokens.primary}
                  textColor={colorRolesTokens.onPrimary}
                />
                <ColorRole
                  label='On Primary'
                  size='sm'
                  backgroundColor={colorRolesTokens.onPrimary}
                  textColor={colorRolesTokens.primary}
                />
              </div>
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Secondary'
                  size='md'
                  backgroundColor={colorRolesTokens.secondary}
                  textColor={colorRolesTokens.onSecondary}
                />
                <ColorRole
                  label='On Secondary'
                  size='sm'
                  backgroundColor={colorRolesTokens.onSecondary}
                  textColor={colorRolesTokens.secondary}
                />
              </div>
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Tertiary'
                  size='md'
                  backgroundColor={colorRolesTokens.tertiary}
                  textColor={colorRolesTokens.onTertiary}
                />
                <ColorRole
                  label='On Tertiary'
                  size='sm'
                  backgroundColor={colorRolesTokens.onTertiary}
                  textColor={colorRolesTokens.tertiary}
                />
              </div>
            </div>
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.flexCol,
                colorRolesStyles.width$sm,
              )}
            >
              <ColorRole
                label='Error'
                size='md'
                backgroundColor={colorRolesTokens.error}
                textColor={colorRolesTokens.onError}
              />
              <ColorRole
                label='On Error'
                size='sm'
                backgroundColor={colorRolesTokens.onError}
                textColor={colorRolesTokens.error}
              />
            </div>
          </div>

          <div
            {...stylex.props(colorRolesStyles.flex, colorRolesStyles.gapX$lg)}
          >
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.gapX$sm,
                colorRolesStyles.width$lg,
              )}
            >
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Primary Container'
                  size='md'
                  backgroundColor={colorRolesTokens.primaryContainer}
                  textColor={colorRolesTokens.onPrimaryContainer}
                />
                <ColorRole
                  label='On Primary Container'
                  size='sm'
                  backgroundColor={colorRolesTokens.onPrimaryContainer}
                  textColor={colorRolesTokens.primaryContainer}
                />
              </div>
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Secondary Container'
                  size='md'
                  backgroundColor={colorRolesTokens.secondaryContainer}
                  textColor={colorRolesTokens.onSecondaryContainer}
                />
                <ColorRole
                  label='On Secondary Container'
                  size='sm'
                  backgroundColor={colorRolesTokens.onSecondaryContainer}
                  textColor={colorRolesTokens.secondaryContainer}
                />
              </div>
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Tertiary Container'
                  size='md'
                  backgroundColor={colorRolesTokens.tertiaryContainer}
                  textColor={colorRolesTokens.onTertiaryContainer}
                />
                <ColorRole
                  label='On Tertiary Container'
                  size='sm'
                  backgroundColor={colorRolesTokens.onTertiaryContainer}
                  textColor={colorRolesTokens.tertiaryContainer}
                />
              </div>
            </div>
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.flexCol,
                colorRolesStyles.width$sm,
              )}
            >
              <ColorRole
                label='Error Container'
                size='md'
                backgroundColor={colorRolesTokens.errorContainer}
                textColor={colorRolesTokens.onErrorContainer}
              />
              <ColorRole
                label='On Error Container'
                size='sm'
                backgroundColor={colorRolesTokens.onErrorContainer}
                textColor={colorRolesTokens.errorContainer}
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div {...stylex.props(colorRolesStyles.flex, colorRolesStyles.flexCol)}>
          <div
            {...stylex.props(colorRolesStyles.flex, colorRolesStyles.gapX$lg)}
          >
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.gapX$sm,
                colorRolesStyles.width$lg,
              )}
            >
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Primary Fixed'
                    size='md'
                    backgroundColor={colorRolesTokens.primaryFixed}
                    textColor={colorRolesTokens.onPrimaryFixed}
                  />
                  <ColorRole
                    label='Primary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesTokens.primaryFixedDim}
                    textColor={colorRolesTokens.onPrimaryFixed}
                  />
                </div>
                <ColorRole
                  label='On Primary Fixed'
                  size='xs'
                  backgroundColor={colorRolesTokens.onPrimaryFixed}
                  textColor={colorRolesTokens.primaryFixed}
                />
                <ColorRole
                  label='On Primary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesTokens.onPrimaryFixedVariant}
                  textColor={colorRolesTokens.primaryFixed}
                />
              </div>
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Secondary Fixed'
                    size='md'
                    backgroundColor={colorRolesTokens.secondaryFixed}
                    textColor={colorRolesTokens.onSecondaryFixed}
                  />
                  <ColorRole
                    label='Secondary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesTokens.secondaryFixedDim}
                    textColor={colorRolesTokens.onSecondaryFixed}
                  />
                </div>
                <ColorRole
                  label='On Secondary Fixed'
                  size='xs'
                  backgroundColor={colorRolesTokens.onSecondaryFixed}
                  textColor={colorRolesTokens.secondaryFixed}
                />
                <ColorRole
                  label='On Secondary Fixed Variant'
                  size='xs'
                  backgroundColor={colorRolesTokens.onSecondaryFixedVariant}
                  textColor={colorRolesTokens.secondaryFixed}
                />
              </div>
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Tertiary Fixed'
                    size='md'
                    backgroundColor={colorRolesTokens.tertiaryFixed}
                    textColor={colorRolesTokens.onTertiaryFixed}
                  />
                  <ColorRole
                    label='Tertiary Fixed Dim'
                    size='md'
                    backgroundColor={colorRolesTokens.tertiaryFixedDim}
                    textColor={colorRolesTokens.onTertiaryFixed}
                  />
                </div>
                <ColorRole
                  label='On Tertiary Fixed'
                  size='xs'
                  backgroundColor={colorRolesTokens.onTertiaryFixed}
                  textColor={colorRolesTokens.tertiaryFixed}
                />
                <ColorRole
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
        <div
          {...stylex.props(
            colorRolesStyles.flex,
            colorRolesStyles.flexCol,
            colorRolesStyles.gapY$sm,
          )}
        >
          <div
            {...stylex.props(colorRolesStyles.flex, colorRolesStyles.gapX$lg)}
          >
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.flexCol,
                colorRolesStyles.gapY$sm,
                colorRolesStyles.width$lg,
              )}
            >
              <div
                {...stylex.props(colorRolesStyles.flex, colorRolesStyles.grow)}
              >
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Surface Dim'
                    size='lg'
                    backgroundColor={colorRolesTokens.surfaceDim}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Surface'
                    size='lg'
                    backgroundColor={colorRolesTokens.surface}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Surface Bright'
                    size='lg'
                    backgroundColor={colorRolesTokens.surfaceBright}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
              </div>
              <div
                {...stylex.props(colorRolesStyles.flex, colorRolesStyles.grow)}
              >
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Surface Container Lowest'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainerLowest}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Surface Container Low'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainerLow}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Surface Container'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainer}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Surface Container High'
                    size='xl'
                    backgroundColor={colorRolesTokens.surfaceContainerHigh}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
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
                colorRolesStyles.flex,
                colorRolesStyles.flexCol,
                colorRolesStyles.gapY$sm,
                colorRolesStyles.width$sm,
              )}
            >
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                )}
              >
                <ColorRole
                  label='Inverse Surface'
                  size='md'
                  backgroundColor={colorRolesTokens.inverseSurface}
                  textColor={colorRolesTokens.inverseOnSurface}
                />
                <ColorRole
                  label='Inverse On Surface'
                  size='sm'
                  backgroundColor={colorRolesTokens.inverseOnSurface}
                  textColor={colorRolesTokens.inverseSurface}
                />
              </div>

              <ColorRole
                label='Inverse Primary'
                size='sm'
                backgroundColor={colorRolesTokens.inversePrimary}
                textColor={colorRolesTokens.onPrimaryContainer}
              />
            </div>
          </div>

          <div
            {...stylex.props(colorRolesStyles.flex, colorRolesStyles.gapX$lg)}
          >
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.flexCol,
                colorRolesStyles.gapY$sm,
                colorRolesStyles.width$lg,
              )}
            >
              <div
                {...stylex.props(colorRolesStyles.flex, colorRolesStyles.grow)}
              >
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='On Surface'
                    size='sm'
                    backgroundColor={colorRolesTokens.onSurface}
                    textColor={colorRolesTokens.surface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='On Surface Variant'
                    size='sm'
                    backgroundColor={colorRolesTokens.onSurfaceVariant}
                    textColor={colorRolesTokens.surface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Outline'
                    size='sm'
                    backgroundColor={colorRolesTokens.outline}
                    textColor={colorRolesTokens.surface}
                  />
                </div>
                <div
                  {...stylex.props(
                    colorRolesStyles.flex,
                    colorRolesStyles.flexCol,
                    colorRolesStyles.grow,
                  )}
                >
                  <ColorRole
                    label='Outline Variant'
                    size='sm'
                    backgroundColor={colorRolesTokens.outlineVariant}
                    textColor={colorRolesTokens.onSurface}
                  />
                </div>
              </div>
            </div>
            <div
              {...stylex.props(
                colorRolesStyles.flex,
                colorRolesStyles.gapX$lg,
                colorRolesStyles.width$sm,
              )}
            >
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Scrim'
                  size='sm'
                  backgroundColor={colorRolesTokens.scrim}
                  textColor={tonalPalettesTokens.white}
                />
              </div>
              <div
                {...stylex.props(
                  colorRolesStyles.flex,
                  colorRolesStyles.flexCol,
                  colorRolesStyles.grow,
                )}
              >
                <ColorRole
                  label='Shadow'
                  size='sm'
                  backgroundColor={colorRolesTokens.scrim}
                  textColor={tonalPalettesTokens.white}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
