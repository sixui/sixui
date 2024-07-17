import stylex from '@stylexjs/stylex';

import type { IDynamicThemeProps } from './DynamicTheme.types';
import { colorRolesTheme } from '@/themes/base/colorRoles.stylex';
import { colorPalettesTokens } from '@/themes/base/colorPalettes.stylex';

const styles = stylex.create({
  dynamicTheme: {
    [colorPalettesTokens.primary40]: 'green',
  },
});

export const DynamicTheme: React.FC<IDynamicThemeProps> = (props) => {
  const { children } = props;

  return (
    <div {...stylex.props(colorRolesTheme, styles.dynamicTheme)}>
      {children}
    </div>
  );
};
