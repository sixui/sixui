import stylex from '@stylexjs/stylex';

import type { ITonalPaletteProps } from './TonalPalette.types';
import { Stack } from '~/components/Stack';
import { tonalPalettesTokens } from '~/themes/base/tonalPalettes.stylex';
import { tonalPaletteStyles } from './TonalPalette.styles';

export const TonalPalette: React.FC<ITonalPaletteProps> = (props) => {
  const { sx, tones } = props;

  return (
    <Stack horizontal sx={sx}>
      {tones.map(({ luminance, color }) => (
        <div
          {...stylex.props(
            tonalPaletteStyles.tone,
            tonalPaletteStyles.toneColor(
              color,
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
    </Stack>
  );
};
