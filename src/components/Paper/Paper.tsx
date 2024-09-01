import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPaperFactory } from './Paper.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { getContainerTextColor } from '~/utils/getContainerTextColor';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { paperStyles, type IPaperStylesFactory } from './Paper.css';

const COMPONENT_NAME = 'Paper';

// FIXME: use sprinkles?

export const Paper = polymorphicComponentFactory<IPaperFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      elevation: elevationProp,
      corner,
      surface: surfaceProp = 'surfaceContainer',
      outlined,
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

    const elevation = outlined ? 0 : elevationProp;
    const surface = outlined ? undefined : surfaceProp;
    const topLeftCorner = typeof corner === 'string' ? corner : corner?.topLeft;
    const topRightCorner =
      typeof corner === 'string' ? corner : corner?.topRight;
    const bottomRightCorner =
      typeof corner === 'string' ? corner : corner?.bottomRight;
    const bottomLeftCorner =
      typeof corner === 'string' ? corner : corner?.bottomLeft;
    const textColor = getContainerTextColor(surface);

    const vars = {
      [paperStyles.tokens.container.color]: surface
        ? themeTokens.colorScheme[surface]
        : undefined,
      [paperStyles.tokens.container.elevation]: elevation
        ? elevationLevelPreset[elevation]
        : undefined,
      [paperStyles.tokens.outline.style]: outlined ? 'solid' : undefined,
      [paperStyles.tokens.container.shape.topLeft]:
        topLeftCorner && themeTokens.shape.corner[topLeftCorner],
      [paperStyles.tokens.container.shape.topRight]:
        topRightCorner && themeTokens.shape.corner[topRightCorner],
      [paperStyles.tokens.container.shape.bottomRight]:
        bottomRightCorner && themeTokens.shape.corner[bottomRightCorner],
      [paperStyles.tokens.container.shape.bottomLeft]:
        bottomLeftCorner && themeTokens.shape.corner[bottomLeftCorner],
      [paperStyles.tokens.text.color]: themeTokens.colorScheme[textColor],
    };

    return (
      <PaperBase
        {...other}
        {...getStyles('root', {
          style: assignInlineVars(vars),
        })}
        ref={forwardedRef}
      />
    );
  },
);

Paper.styles = paperStyles;
Paper.displayName = `@sixui/${COMPONENT_NAME}`;
