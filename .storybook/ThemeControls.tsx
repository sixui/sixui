import stylex from '@stylexjs/stylex';
import { useState } from 'react';

import { TextInputField } from '~/components/TextInputField';
import { themeProviderStyles } from '~/components/Theme';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTheme } from '~/themes/base/shape.stylex';
import { spacingTheme } from '~/themes/base/spacing.stylex';
import { typeScaleTheme } from '~/themes/base/typeScale.stylex';

export type IThemeControlsProps = {
  children: React.ReactNode;
};

const styles = stylex.create({
  controls: {
    display: 'flex',
    gap: 1,
  },
  control: {
    width: `calc(150px * ${scaleTokens.scale})`,
    flexGrow: 0,
  },
});

export const ThemeControls: React.FC<IThemeControlsProps> = (props) => {
  const { children } = props;
  const [scale, setScale] = useState('1');
  const [density, setDensity] = useState('0');

  return (
    <div
      {...stylex.props(
        themeProviderStyles.dynamicScale({
          scale,
        }),
        themeProviderStyles.dynamicDensity({
          density,
          interval: '4px',
          minTargetSize: '48',
        }),
        spacingTheme,
        typeScaleTheme,
        shapeTheme,
      )}
    >
      <div {...stylex.props(styles.controls)}>
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
      </div>
      {children}
    </div>
  );
};
