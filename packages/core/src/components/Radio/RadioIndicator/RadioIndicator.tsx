import type { IRadioIndicatorThemeFactory } from './RadioIndicator.css';
import type { IRadioIndicatorFactory } from './RadioIndicator.types';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { PaperBase } from '~/components/PaperBase';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './RadioIndicator.constants';
import { RadioIndicatorTheme } from './RadioIndicator.css';

export const RadioIndicator = componentFactory<IRadioIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      checked,
      loading,
      disabled: disabledProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const disabled = disabledProp || loading;

    const { getStyles } = useComponentTheme<IRadioIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: RadioIndicatorTheme,
      modifiers: {
        disabled,
        loading,
        checked,
      },
    });

    return (
      <PaperBase {...getStyles('root')} ref={forwardedRef} {...other}>
        {loading && (
          <IndeterminateCircularProgressIndicator
            {...getStyles('progressIndicator')}
            disabled={disabled}
          />
        )}

        <svg {...getStyles('icon')} viewBox="0 0 20 20">
          <circle
            {...getStyles(['circle', 'circle$inner'])}
            cx="10"
            cy="10"
            r="5"
          />
        </svg>
      </PaperBase>
    );
  },
);

RadioIndicator.theme = RadioIndicatorTheme;
RadioIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
