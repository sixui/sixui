import stylex from '@stylexjs/stylex';

import type { IDensityProps } from './Density.types';
import { densityTokens } from '~/themes/base/density.stylex';

const dynamicStyles = stylex.create({
  density: (density: number) => ({
    [densityTokens.density]: String(density),
  }),
  minTargetSize: (minTargetSize: string) => ({
    [densityTokens.minTargetSize]: minTargetSize,
  }),
});

export const Density: React.FC<IDensityProps> = (props) => {
  const { density, children } = props;
  const minTargetSizeDisabled = Number(density) < 0;

  return (
    <div
      {...stylex.props(
        dynamicStyles.density(density),
        minTargetSizeDisabled && dynamicStyles.minTargetSize('100%'),
      )}
    >
      {children}
    </div>
  );
};
