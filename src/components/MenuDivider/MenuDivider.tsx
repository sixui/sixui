import { forwardRef, useMemo } from 'react';

import { Divider, type IDividerProps } from '~/components/Divider';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { menuDividerStyles } from './MenuDivider.styles';

export const MenuDivider = forwardRef<HTMLDivElement, IDividerProps>(
  function MenuDivider(props, forwardedRef) {
    const { styles, sx, ...other } = props;

    const componentTheme = useComponentTheme('MenuDivider');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(menuDividerStyles, styles),
      [styles],
    );

    return (
      <Divider
        sx={[componentTheme.overridenStyles, stylesCombinator('host'), sx]}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);
