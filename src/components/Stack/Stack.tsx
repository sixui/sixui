import { forwardRef } from 'react';

import type { IStackProps } from './Stack.types';
import { useStyles } from '~/hooks/useStyles';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Base } from '~/components/Base';
import { StackStyles } from './Stack.styles';
import { filterFalsyChildren } from '~/helpers/react/filterFalsyChildren';
import { commonStyles } from '~/helpers/commonStyles';

export const Stack = createPolymorphicComponent<'div', IStackProps>(
  forwardRef<HTMLDivElement, IStackProps>(function Stack(props, forwardedRef) {
    const {
      styles,
      sx,
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

    const { combineStyles, globalStyles } = useStyles({
      name: 'Stack',
      styles: [StackStyles, styles],
    });

    const filteredChildren = filterFalsyChildren(children);
    const orientation = horizontal ? 'horizontal' : 'vertical';
    const align = alignProp ?? (horizontal ? 'center' : 'stretch');

    return (
      <Base
        {...other}
        sx={[
          globalStyles,
          gap !== undefined &&
            (horizontal
              ? commonStyles.horizontalGap(gap)
              : commonStyles.verticalGap(gap)),
          commonStyles.justifyContent(justify),
          commonStyles.alignItems(align),
          commonStyles.flexWrap(wrap ? 'wrap' : 'nowrap'),
          commonStyles.flexGrow(!!grow),
          combineStyles('host', `host$${orientation}`),
          sx,
        ]}
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
      </Base>
    );
  }),
);
