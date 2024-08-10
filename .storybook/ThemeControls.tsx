import stylex from '@stylexjs/stylex';
import { useState } from 'react';

import { Stack } from '~/components/Stack';
import { TextInputField } from '~/components/TextInputField';
import { themeProviderStyles } from '~/components/Theme';
import { outlineTheme } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTheme } from '~/themes/base/shape.stylex';
import { spacingTheme } from '~/themes/base/spacing.stylex';
import { typeScaleTheme } from '~/themes/base/typeScale.stylex';

export type IThemeControlsProps = {
  children: React.ReactNode;
};

const styles = stylex.create({
  control: {
    width: `calc(150px * ${scaleTokens.scale})`,
    flexGrow: 0,
  },
});

export const ThemeControls: React.FC<IThemeControlsProps> = (props) => {
  const { children } = props;
  const [scale, setScale] = useState('1');
  const [density, setDensity] = useState('0');
  const [minTargetSize, setMinTargetSize] = useState('48');

  return (
    <div
      {...stylex.props(
        themeProviderStyles.dynamicScale({
          scale,
        }),
        themeProviderStyles.dynamicDensity({
          density,
          interval: '4px',
          minTargetSize: `max(100%, ${minTargetSize}px)`,
        }),
        spacingTheme,
        typeScaleTheme,
        shapeTheme,
        outlineTheme,
      )}
    >
      <Stack horizontal gap={1}>
        <TextInputField
          sx={styles.control}
          label='Scale'
          type='number'
          value={scale}
          step='0.1'
          onChange={(event) => setScale(event.target.value)}
        />
        <TextInputField
          sx={styles.control}
          label='Density'
          type='number'
          value={density}
          step='1'
          onChange={(event) => setDensity(event.target.value)}
        />
        <TextInputField
          sx={styles.control}
          label='Min Target Size'
          type='number'
          value={minTargetSize}
          step='2'
          suffixText='px'
          onChange={(event) => setMinTargetSize(event.target.value)}
        />
      </Stack>
      {children}
    </div>
  );
};
