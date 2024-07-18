import stylex from '@stylexjs/stylex';

import type { ITonalPaletteProps } from './TonalPalette.types';
import { tonalPalettesTokens } from '@/themes/base/tonalPalettes.stylex';
import { tonalPaletteStyles } from './TonalPalette.styles';

export const TonalPalette: React.FC<ITonalPaletteProps> = (props) => {
  const { palette } = props;

  return (
    <div {...stylex.props(tonalPaletteStyles.host)}>
      {palette.tones.map(({ luminance, key }) => (
        <div
          {...stylex.props(
            tonalPaletteStyles.tone,
            tonalPaletteStyles.toneColor(
              tonalPalettesTokens[key],
              luminance > 50
                ? tonalPalettesTokens.black
                : tonalPalettesTokens.white,
            ),
          )}
          key={luminance}
          title={`Luminance ${luminance}`}
        >
          <div {...stylex.props(tonalPaletteStyles.toneLabel)}>{luminance}</div>
        </div>
      ))}
    </div>
  );
};
