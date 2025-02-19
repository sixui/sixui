import type { ISwitchIndicatorThemeFactory } from './SwitchIndicator.css';
import type { ISwitchIndicatorFactory } from './SwitchIndicator.types';
import { iconCheckmark, iconXMark } from '~/assets/icons';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { PaperBase } from '~/components/PaperBase';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SwitchIndicator.constants';
import { basicTemplateTheme } from './SwitchIndicator.css';

/**
 * @see https://m3.material.io/components/switch/overview
 */
export const SwitchIndicator = componentFactory<ISwitchIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      checked,
      disabled: disabledProp,
      loading,
      checkedIcon,
      uncheckedIcon,
      alwaysOn,
      stateLayer,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const hasIcon =
      loading || (checked && !!checkedIcon) || (!checked && !!uncheckedIcon);
    const isOn = checked || alwaysOn;
    const disabled = disabledProp || loading;

    const { getStyles } = useComponentTheme<ISwitchIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: basicTemplateTheme,
      modifiers: {
        disabled,
        checked,
        'with-icon': hasIcon,
        loading,
        on: isOn,
      },
    });

    return (
      <PaperBase {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('track')}>
          <div {...getStyles('handleContainer')}>
            {!disabled && stateLayer}

            <PaperBase {...getStyles('handle')}>
              <div {...getStyles(['icon', 'icon$checked'])}>
                {loading ? (
                  <IndeterminateCircularProgressIndicator
                    {...getStyles('progressIndicator')}
                  />
                ) : checkedIcon === true ? (
                  <SvgIcon icon={iconCheckmark} />
                ) : (
                  checkedIcon
                )}
              </div>

              <div {...getStyles(['icon', 'icon$unchecked'])}>
                {loading ? (
                  <IndeterminateCircularProgressIndicator
                    {...getStyles('progressIndicator')}
                  />
                ) : uncheckedIcon === true ? (
                  <SvgIcon icon={iconXMark} />
                ) : (
                  uncheckedIcon
                )}
              </div>
            </PaperBase>
          </div>
        </div>
      </PaperBase>
    );
  },
);

SwitchIndicator.theme = basicTemplateTheme;
SwitchIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
