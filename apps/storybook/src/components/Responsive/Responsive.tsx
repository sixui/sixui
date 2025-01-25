import type { IResponsiveThemeFactory } from './Responsive.css';
import type { IResponsiveFactory } from './Responsive.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useResponsiveCssRules } from './useResponsiveCssRules';
import { responsiveTheme } from './Responsive.css';

const COMPONENT_NAME = 'Responsive';

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
          dangerouslySetInnerHTML={{ __html: responsiveCssRules }}
        />
        {children}
      </div>
    );
  },
);

Responsive.theme = responsiveTheme;
Responsive.displayName = `@sixui/${COMPONENT_NAME}`;
