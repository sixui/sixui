import type { IPaperFactory } from './Paper.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { PaperBase } from '../PaperBase';
import {
  paperStyles,
  paperSprinkles,
  paperBackgroundSprinkles,
  paperElevationSprinkles,
  paperOutlineSprinkles,
  type IPaperStylesFactory,
} from './Paper.css';

const COMPONENT_NAME = 'Paper';

export const Paper = polymorphicComponentFactory<IPaperFactory>(
  (props, forwardedRef) => {
    const { classNames, className, style, variant, ...otherWithSprinkles } =
      useProps({
        componentName: COMPONENT_NAME,
        props,
      });

    const sprinkles = paperSprinkles(otherWithSprinkles);
    const backgroundSprinkles = paperBackgroundSprinkles(sprinkles.otherProps);
    const elevationSprinkles = paperElevationSprinkles(
      backgroundSprinkles.otherProps,
    );
    const outlineSprinkles = paperOutlineSprinkles(
      elevationSprinkles.otherProps,
    );
    const other = outlineSprinkles.otherProps;

    const { getStyles } = useStyles<IPaperStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: paperStyles,
      style,
      variant,
    });

    return (
      <PaperBase
        {...other}
        {...getStyles('root', {
          className: sprinkles.className,
          style: {
            ...sprinkles.style,
            ...backgroundSprinkles.style,
            ...elevationSprinkles.style,
            ...outlineSprinkles.style,
          },
        })}
        classNames={{
          background: backgroundSprinkles.className,
          elevation: elevationSprinkles.className,
          outline: outlineSprinkles.className,
        }}
        ref={forwardedRef}
      />
    );
  },
);

Paper.styles = paperStyles;
Paper.displayName = `@sixui/${COMPONENT_NAME}`;
