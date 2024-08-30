import type { IPaperFactory } from './Paper.types';
import { polymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
import { PaperBase } from '../PaperBase';
import { paperStyles, type IPaperStylesFactory } from './Paper.css';

const COMPONENT_NAME = 'Paper';

export const Paper = polymorphicComponentFactory<IPaperFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      children,
      elevation: elevationProp,
      corner,
      surface: surfaceProp = 'surfaceContainer',
      outlined,
      fill,
      expand,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useStyles<IPaperStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: paperStyles,
      style,
    });

    // const elevation = outlined ? 0 : elevationProp;
    // const surface = outlined ? undefined : surfaceProp;
    // const topLeftCorner = typeof corner === 'string' ? corner : corner?.topLeft;
    // const topRightCorner =
    //   typeof corner === 'string' ? corner : corner?.topRight;
    // const bottomRightCorner =
    //   typeof corner === 'string' ? corner : corner?.bottomRight;
    // const bottomLeftCorner =
    //   typeof corner === 'string' ? corner : corner?.bottomLeft;
    // const textColor = getContainerTextColor(surface);

    return (
      <PaperBase
        // sx={[
        //   fill && commonStyles.fill,
        //   expand && commonStyles.expand,
        //   surface && paperDynamicStyles.surfaceColor(surface),
        //   !!elevation && paperDynamicStyles.containerElevation(elevation),
        //   topLeftCorner &&
        //     paperDynamicStyles.containerShape$topLeft(topLeftCorner),
        //   topRightCorner &&
        //     paperDynamicStyles.containerShape$topRight(topRightCorner),
        //   bottomRightCorner &&
        //     paperDynamicStyles.containerShape$bottomRight(bottomRightCorner),
        //   bottomLeftCorner &&
        //     paperDynamicStyles.containerShape$bottomLeft(bottomLeftCorner),
        //   paperDynamicStyles.textColor(textColor),
        //   paperDynamicStyles.outlineStyle(outlined ? 'solid' : 'none'),
        //   sx,
        // ]}
        // styles={innerStyles?.paperBase}
        // innerStyles={innerStyles}
        {...other}
        ref={forwardedRef}
      >
        {children}
      </PaperBase>
    );
  },
);
