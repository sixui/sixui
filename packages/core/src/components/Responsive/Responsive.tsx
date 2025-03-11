import type { IResponsiveThemeFactory } from './Responsive.css';
import type { IResponsiveFactory } from './Responsive.types';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { useResponsiveCssRules } from './hooks/useResponsiveCssRules';
import { COMPONENT_NAME } from './Responsive.constants';
import { responsiveTheme } from './Responsive.css';

export const Responsive = componentFactory<IResponsiveFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const responsiveCssRules = useResponsiveCssRules();

    const { getStyles } = useComponentTheme<IResponsiveThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: responsiveTheme,
    });

    return (
      <div {...getStyles('root')} ref={forwardedRef} {...other}>
        <style
          type="text/css"
          data-sixui-styles={COMPONENT_NAME}
          dangerouslySetInnerHTML={{ __html: responsiveCssRules }}
        />
        {children}
      </div>
    );
  },
);

Responsive.displayName = `@sixui/core/${COMPONENT_NAME}`;
Responsive.theme = responsiveTheme;
