import type { StyleXVar } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IColorPalettesThemeVars } from '@/themes/colorPalettes.types';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { colorPalettesTokens } from '@/themes/base/tokens/colorPalettes.stylex';
import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';

export type IColorPalettesProps = Record<string, never>;

const styles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2rem',
    fontFamily: typescaleTokens.labelFont$lg,
    fontSize: typescaleTokens.labelSize$lg,
    fontWeight: typescaleTokens.labelWeight$lg,
    lineHeight: typescaleTokens.labelLineHeight$lg,
    letterSpacing: typescaleTokens.labelLetterSpacing$lg,
  },
  title: {
    color: colorRolesTokens.onSurface,
  },
  tonalPalette: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
  },
  tonalRow: {
    display: 'flex',
    height: '72px',
    justifyContent: 'space-evenly',
  },
  tone: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    position: 'relative',
  },
  toneColor: (
    bg: string | StyleXVar<string>,
    text: string | StyleXVar<string>,
  ) => ({
    backgroundColor: bg,
    color: text,
  }),
  toneLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflowWrap: 'break-word',
    textTransform: 'capitalize',
  },
});

type ITone = { luminance: number; key: keyof IColorPalettesThemeVars };

type ITonalPalette = {
  title: string;
  tones: Array<ITone>;
};

const tonalPalettes: Array<ITonalPalette> = [
  {
    title: 'Primary',
    tones: [
      { luminance: 100, key: 'primary100' },
      { luminance: 99, key: 'primary99' },
      { luminance: 95, key: 'primary95' },
      { luminance: 90, key: 'primary90' },
      { luminance: 80, key: 'primary80' },
      { luminance: 70, key: 'primary70' },
      { luminance: 60, key: 'primary60' },
      { luminance: 50, key: 'primary50' },
      { luminance: 40, key: 'primary40' },
      { luminance: 30, key: 'primary30' },
      { luminance: 20, key: 'primary20' },
      { luminance: 10, key: 'primary10' },
      { luminance: 0, key: 'primary0' },
    ],
  },
  {
    title: 'Secondary',
    tones: [
      { luminance: 100, key: 'secondary100' },
      { luminance: 99, key: 'secondary99' },
      { luminance: 95, key: 'secondary95' },
      { luminance: 90, key: 'secondary90' },
      { luminance: 80, key: 'secondary80' },
      { luminance: 70, key: 'secondary70' },
      { luminance: 60, key: 'secondary60' },
      { luminance: 50, key: 'secondary50' },
      { luminance: 40, key: 'secondary40' },
      { luminance: 30, key: 'secondary30' },
      { luminance: 20, key: 'secondary20' },
      { luminance: 10, key: 'secondary10' },
      { luminance: 0, key: 'secondary0' },
    ],
  },
  {
    title: 'Tertiary',
    tones: [
      { luminance: 100, key: 'tertiary100' },
      { luminance: 99, key: 'tertiary99' },
      { luminance: 95, key: 'tertiary95' },
      { luminance: 90, key: 'tertiary90' },
      { luminance: 80, key: 'tertiary80' },
      { luminance: 70, key: 'tertiary70' },
      { luminance: 60, key: 'tertiary60' },
      { luminance: 50, key: 'tertiary50' },
      { luminance: 40, key: 'tertiary40' },
      { luminance: 30, key: 'tertiary30' },
      { luminance: 20, key: 'tertiary20' },
      { luminance: 10, key: 'tertiary10' },
      { luminance: 0, key: 'tertiary0' },
    ],
  },
  {
    title: 'Error',
    tones: [
      { luminance: 100, key: 'error100' },
      { luminance: 99, key: 'error99' },
      { luminance: 95, key: 'error95' },
      { luminance: 90, key: 'error90' },
      { luminance: 80, key: 'error80' },
      { luminance: 70, key: 'error70' },
      { luminance: 60, key: 'error60' },
      { luminance: 50, key: 'error50' },
      { luminance: 40, key: 'error40' },
      { luminance: 30, key: 'error30' },
      { luminance: 20, key: 'error20' },
      { luminance: 10, key: 'error10' },
      { luminance: 0, key: 'error0' },
    ],
  },
  {
    title: 'Neutral',
    tones: [
      { luminance: 100, key: 'neutral100' },
      { luminance: 99, key: 'neutral99' },
      { luminance: 98, key: 'neutral98' },
      { luminance: 96, key: 'neutral96' },
      { luminance: 95, key: 'neutral95' },
      { luminance: 94, key: 'neutral94' },
      { luminance: 92, key: 'neutral92' },
      { luminance: 90, key: 'neutral90' },
      { luminance: 87, key: 'neutral87' },
      { luminance: 80, key: 'neutral80' },
      { luminance: 70, key: 'neutral70' },
      { luminance: 60, key: 'neutral60' },
      { luminance: 50, key: 'neutral50' },
      { luminance: 40, key: 'neutral40' },
      { luminance: 35, key: 'neutral35' },
      { luminance: 30, key: 'neutral30' },
      { luminance: 25, key: 'neutral25' },
      { luminance: 24, key: 'neutral24' },
      { luminance: 22, key: 'neutral22' },
      { luminance: 20, key: 'neutral20' },
      { luminance: 17, key: 'neutral17' },
      { luminance: 12, key: 'neutral12' },
      { luminance: 10, key: 'neutral10' },
      { luminance: 6, key: 'neutral6' },
      { luminance: 4, key: 'neutral4' },
      { luminance: 0, key: 'neutral0' },
    ],
  },
  {
    title: 'Neutral Variant',
    tones: [
      { luminance: 100, key: 'neutralVariant100' },
      { luminance: 99, key: 'neutralVariant99' },
      { luminance: 95, key: 'neutralVariant95' },
      { luminance: 90, key: 'neutralVariant90' },
      { luminance: 80, key: 'neutralVariant80' },
      { luminance: 70, key: 'neutralVariant70' },
      { luminance: 60, key: 'neutralVariant60' },
      { luminance: 50, key: 'neutralVariant50' },
      { luminance: 40, key: 'neutralVariant40' },
      { luminance: 30, key: 'neutralVariant30' },
      { luminance: 20, key: 'neutralVariant20' },
      { luminance: 10, key: 'neutralVariant10' },
      { luminance: 0, key: 'neutralVariant0' },
    ],
  },
];

export const ColorPalettes: React.FC<IColorPalettesProps> = () => (
  <div {...stylex.props(styles.host)}>
    {tonalPalettes.map((palette) => (
      <div {...stylex.props(styles.tonalPalette)} key={palette.title}>
        <div {...stylex.props(styles.title)}>{palette.title}</div>
        <div {...stylex.props(styles.tonalRow)}>
          {palette.tones.map(({ luminance, key }) => (
            <div
              {...stylex.props(
                styles.tone,
                styles.toneColor(
                  colorPalettesTokens[key],
                  luminance > 50
                    ? colorPalettesTokens.black
                    : colorPalettesTokens.white,
                ),
              )}
              key={luminance}
              title={`Luminance ${luminance}`}
            >
              <div {...stylex.props(styles.toneLabel)}>{luminance}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
