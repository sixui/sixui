import type { IResizeHandleThemeFactory } from './ResizeHandle.css';
import type { IResizeHandleFactory } from './ResizeHandle.types';
import { ButtonBase } from '~/components/ButtonBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css';
import { COMPONENT_NAME } from './ResizeHandle.constants';
import { resizeHandleTheme } from './ResizeHandle.css';

export const ResizeHandle = componentFactory<IResizeHandleFactory>(
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

    const { getStyles } = useComponentTheme<IResizeHandleThemeFactory>({
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

ResizeHandle.theme = resizeHandleTheme;
ResizeHandle.displayName = `@sixui/core/${COMPONENT_NAME}`;
