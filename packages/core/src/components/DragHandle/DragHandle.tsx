import type { IDragHandleThemeFactory } from './DragHandle.css';
import type { IDragHandleFactory } from './DragHandle.types';
import { ButtonBase } from '~/components/ButtonBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css';
import { COMPONENT_NAME } from './DragHandle.constants';
import { resizeHandleTheme } from './DragHandle.css';

export const DragHandle = componentFactory<IDragHandleFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      orientation = 'vertical',
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDragHandleThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: resizeHandleTheme,
      modifiers: {
        orientation,
      },
    });

    return (
      <ButtonBase
        {...getStyles('root')}
        ref={forwardedRef}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
          touchTarget: getStyles('touchTarget').className,
        })}
        {...other}
      >
        {({ renderStateLayer, renderTouchTarget }) => (
          <>
            {renderStateLayer()}
            {children}
            {renderTouchTarget()}
          </>
        )}
      </ButtonBase>
    );
  },
);

DragHandle.theme = resizeHandleTheme;
DragHandle.displayName = `@sixui/core/${COMPONENT_NAME}`;
