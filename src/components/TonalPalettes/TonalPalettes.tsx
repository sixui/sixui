import stylex from '@stylexjs/stylex';

import type { ITone } from './TonalPalette.types';
import type { ITonalPalettesProps } from './TonalPalettes.types';
import { tonalPalettesTokens } from '@/themes/base/tonalPalettes.stylex';
import { tonalPalettesStyles } from './TonalPalettes.styles';
import { TonalPalette } from './TonalPalette';

type ITonalPalette = {
  title: string;
  tones: Array<ITone>;
};

const tonalPalettes: Array<ITonalPalette> = [
  {
    title: 'Primary',
    tones: [
      { luminance: 100, color: tonalPalettesTokens.primary100 },
      { luminance: 99, color: tonalPalettesTokens.primary99 },
      { luminance: 95, color: tonalPalettesTokens.primary95 },
      { luminance: 90, color: tonalPalettesTokens.primary90 },
      { luminance: 80, color: tonalPalettesTokens.primary80 },
      { luminance: 70, color: tonalPalettesTokens.primary70 },
      { luminance: 60, color: tonalPalettesTokens.primary60 },
      { luminance: 50, color: tonalPalettesTokens.primary50 },
      { luminance: 40, color: tonalPalettesTokens.primary40 },
      { luminance: 30, color: tonalPalettesTokens.primary30 },
      { luminance: 20, color: tonalPalettesTokens.primary20 },
      { luminance: 10, color: tonalPalettesTokens.primary10 },
      { luminance: 0, color: tonalPalettesTokens.primary0 },
    ],
  },
  {
    title: 'Secondary',
    tones: [
      { luminance: 100, color: tonalPalettesTokens.secondary100 },
      { luminance: 99, color: tonalPalettesTokens.secondary99 },
      { luminance: 95, color: tonalPalettesTokens.secondary95 },
      { luminance: 90, color: tonalPalettesTokens.secondary90 },
      { luminance: 80, color: tonalPalettesTokens.secondary80 },
      { luminance: 70, color: tonalPalettesTokens.secondary70 },
      { luminance: 60, color: tonalPalettesTokens.secondary60 },
      { luminance: 50, color: tonalPalettesTokens.secondary50 },
      { luminance: 40, color: tonalPalettesTokens.secondary40 },
      { luminance: 30, color: tonalPalettesTokens.secondary30 },
      { luminance: 20, color: tonalPalettesTokens.secondary20 },
      { luminance: 10, color: tonalPalettesTokens.secondary10 },
      { luminance: 0, color: tonalPalettesTokens.secondary0 },
    ],
  },
  {
    title: 'Tertiary',
    tones: [
      { luminance: 100, color: tonalPalettesTokens.tertiary100 },
      { luminance: 99, color: tonalPalettesTokens.tertiary99 },
      { luminance: 95, color: tonalPalettesTokens.tertiary95 },
      { luminance: 90, color: tonalPalettesTokens.tertiary90 },
      { luminance: 80, color: tonalPalettesTokens.tertiary80 },
      { luminance: 70, color: tonalPalettesTokens.tertiary70 },
      { luminance: 60, color: tonalPalettesTokens.tertiary60 },
      { luminance: 50, color: tonalPalettesTokens.tertiary50 },
      { luminance: 40, color: tonalPalettesTokens.tertiary40 },
      { luminance: 30, color: tonalPalettesTokens.tertiary30 },
      { luminance: 20, color: tonalPalettesTokens.tertiary20 },
      { luminance: 10, color: tonalPalettesTokens.tertiary10 },
      { luminance: 0, color: tonalPalettesTokens.tertiary0 },
    ],
  },
  {
    title: 'Error',
    tones: [
      { luminance: 100, color: tonalPalettesTokens.error100 },
      { luminance: 99, color: tonalPalettesTokens.error99 },
      { luminance: 95, color: tonalPalettesTokens.error95 },
      { luminance: 90, color: tonalPalettesTokens.error90 },
      { luminance: 80, color: tonalPalettesTokens.error80 },
      { luminance: 70, color: tonalPalettesTokens.error70 },
      { luminance: 60, color: tonalPalettesTokens.error60 },
      { luminance: 50, color: tonalPalettesTokens.error50 },
      { luminance: 40, color: tonalPalettesTokens.error40 },
      { luminance: 30, color: tonalPalettesTokens.error30 },
      { luminance: 20, color: tonalPalettesTokens.error20 },
      { luminance: 10, color: tonalPalettesTokens.error10 },
      { luminance: 0, color: tonalPalettesTokens.error0 },
    ],
  },
  {
    title: 'Neutral',
    tones: [
      { luminance: 100, color: tonalPalettesTokens.neutral100 },
      { luminance: 99, color: tonalPalettesTokens.neutral99 },
      { luminance: 98, color: tonalPalettesTokens.neutral98 },
      { luminance: 96, color: tonalPalettesTokens.neutral96 },
      { luminance: 95, color: tonalPalettesTokens.neutral95 },
      { luminance: 94, color: tonalPalettesTokens.neutral94 },
      { luminance: 92, color: tonalPalettesTokens.neutral92 },
      { luminance: 90, color: tonalPalettesTokens.neutral90 },
      { luminance: 87, color: tonalPalettesTokens.neutral87 },
      { luminance: 80, color: tonalPalettesTokens.neutral80 },
      { luminance: 70, color: tonalPalettesTokens.neutral70 },
      { luminance: 60, color: tonalPalettesTokens.neutral60 },
      { luminance: 50, color: tonalPalettesTokens.neutral50 },
      { luminance: 40, color: tonalPalettesTokens.neutral40 },
      { luminance: 35, color: tonalPalettesTokens.neutral35 },
      { luminance: 30, color: tonalPalettesTokens.neutral30 },
      { luminance: 25, color: tonalPalettesTokens.neutral25 },
      { luminance: 24, color: tonalPalettesTokens.neutral24 },
      { luminance: 22, color: tonalPalettesTokens.neutral22 },
      { luminance: 20, color: tonalPalettesTokens.neutral20 },
      { luminance: 17, color: tonalPalettesTokens.neutral17 },
      { luminance: 12, color: tonalPalettesTokens.neutral12 },
      { luminance: 10, color: tonalPalettesTokens.neutral10 },
      { luminance: 6, color: tonalPalettesTokens.neutral6 },
      { luminance: 4, color: tonalPalettesTokens.neutral4 },
      { luminance: 0, color: tonalPalettesTokens.neutral0 },
    ],
  },
  {
    title: 'Neutral Variant',
    tones: [
      { luminance: 100, color: tonalPalettesTokens.neutralVariant100 },
      { luminance: 99, color: tonalPalettesTokens.neutralVariant99 },
      { luminance: 95, color: tonalPalettesTokens.neutralVariant95 },
      { luminance: 90, color: tonalPalettesTokens.neutralVariant90 },
      { luminance: 80, color: tonalPalettesTokens.neutralVariant80 },
      { luminance: 70, color: tonalPalettesTokens.neutralVariant70 },
      { luminance: 60, color: tonalPalettesTokens.neutralVariant60 },
      { luminance: 50, color: tonalPalettesTokens.neutralVariant50 },
      { luminance: 40, color: tonalPalettesTokens.neutralVariant40 },
      { luminance: 30, color: tonalPalettesTokens.neutralVariant30 },
      { luminance: 20, color: tonalPalettesTokens.neutralVariant20 },
      { luminance: 10, color: tonalPalettesTokens.neutralVariant10 },
      { luminance: 0, color: tonalPalettesTokens.neutralVariant0 },
    ],
  },
];

export const TonalPalettes: React.FC<ITonalPalettesProps> = () => (
  <div {...stylex.props(tonalPalettesStyles.host)}>
    {tonalPalettes.map((palette) => (
      <div
        {...stylex.props(tonalPalettesStyles.tonalPalette)}
        key={palette.title}
      >
        <div {...stylex.props(tonalPalettesStyles.title)}>{palette.title}</div>
        <TonalPalette tones={palette.tones} key={palette.title} />
      </div>
    ))}
  </div>
);
