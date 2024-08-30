import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPaperFactory } from './Paper.types';
import { polymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
import { getContainerTextColor } from '~/utils/getContainerTextColor';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { paperStyles, type IPaperStylesFactory } from './Paper.css';

const COMPONENT_NAME = 'Paper';

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
      [PaperBase.styles.tokens.container.color]: surface
        ? themeTokens.colorScheme[surface]
        : undefined,
      [PaperBase.styles.tokens.container.elevation]: elevation
        ? elevationLevelPreset[elevation]
        : undefined,
      [PaperBase.styles.tokens.outline.style]: outlined ? 'solid' : undefined,
      [PaperBase.styles.tokens.container.shape.topLeft]:
        topLeftCorner && themeTokens.shape.corner[topLeftCorner],
      [PaperBase.styles.tokens.container.shape.topRight]:
        topRightCorner && themeTokens.shape.corner[topRightCorner],
      [PaperBase.styles.tokens.container.shape.bottomRight]:
        bottomRightCorner && themeTokens.shape.corner[bottomRightCorner],
      [PaperBase.styles.tokens.container.shape.bottomLeft]:
        bottomLeftCorner && themeTokens.shape.corner[bottomLeftCorner],
      [PaperBase.styles.tokens.text.color]: themeTokens.colorScheme[textColor],
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
