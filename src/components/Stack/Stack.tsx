import { forwardRef } from 'react';

import type { IStackProps } from './Stack.types';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { Box } from '~/components/Box';
import { filterFalsyChildren } from '~/helpers/react/filterFalsyChildren';
import { stackStyles, stackVariants } from './Stack.css';

export const Stack = createPolymorphicComponent<'div', IStackProps>(
  forwardRef<HTMLDivElement, IStackProps>(function Stack(props, forwardedRef) {
    const {
      className,
      style,
      styles,
      children,
      horizontal,
      gap,
      align: alignProp,
      justify = 'start',
      wrap,
      grow,
      divider,
      ...other
    } = props;

    const { getStyles } = useComponentTheme({
      name: 'Stack',
      className,
      style,
      stylesList: [stackStyles, styles],
      variants: stackVariants,
      variant: horizontal ? 'horizontal' : 'vertical',
    });

    const filteredChildren = filterFalsyChildren(children);
    const orientation = horizontal ? 'horizontal' : 'vertical';
    const align = alignProp ?? (horizontal ? 'center' : 'stretch');

    return (
      <Box
        {...other}
        {...getStyles('root')}
        // sx={[
        //   globalStyles,
        //   gap !== undefined &&
        //     (horizontal
        //       ? commonStyles.horizontalGap(gap)
        //       : commonStyles.verticalGap(gap)),
        //   commonStyles.justifyContent(justify),
        //   commonStyles.alignItems(align),
        //   commonStyles.flexWrap(wrap ? 'wrap' : 'nowrap'),
        //   commonStyles.flexGrow(!!grow),
        //   combineStyles('host', `host$${orientation}`),
        //   sx,
        // ]}
        ref={forwardedRef}
      >
        {divider
          ? filteredChildren.reduce((acc, child, index) => {
              if (index === 0) {
                return [child];
              }

              return [...acc, divider, child];
            }, [] as Array<React.ReactNode>)
          : filteredChildren}
      </Box>
    );
  }),
);
