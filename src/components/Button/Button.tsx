import { MouseEventHandler, useCallback, useState } from 'react';

import type { IButtonThemeFactory } from './Button.css';
import type { IButtonFactory } from './Button.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { buttonTheme, buttonThemeVariants } from './Button.css';

const COMPONENT_NAME = 'Button';

export const Button = polymorphicComponentFactory<IButtonFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'filled',
      children,
      onClick,
      leadingIcon,
      trailingIcon,
      loading: loadingProp,
      loadingAnimation = 'progressIndicator',
      loadingText,
      readOnly: readOnlyProp,
      hasLeading: hasLeadingProp,
      hasTrailing: hasTrailingProp,
      start,
      end,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [animating, setAnimating] = useState(false);
    const [handlingClick, setHandlingClick] = useState(false);
    const loading =
      (loadingProp || handlingClick) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading;
    const disabledOrReadOnly = other.disabled || readOnly;

    const hasLeading = hasLeadingProp ?? (!!start || !!leadingIcon);
    const hasTrailing = hasTrailingProp ?? (!!end || !!trailingIcon);
    const hasOverlay =
      loading && (!!loadingText || (!hasLeading && !hasTrailing));
    const iconAnimation =
      (loadingProp || handlingClick || animating) &&
      loadingAnimation !== undefined &&
      loadingAnimation !== 'progressIndicator' &&
      loadingAnimation !== 'none'
        ? loadingAnimation
        : undefined;

    const { getStyles } = useComponentTheme<IButtonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: buttonTheme,
      themeVariants: buttonThemeVariants,
      variant,
      modifiers: {
        disabled: disabledOrReadOnly,
        loading,
        'with-leading-slot': !!hasLeading,
        'with-trailing-slot': !!hasTrailing,
        'icon-animation': iconAnimation,
      },
    });

    const handleAnimationIteration = useCallback(
      (): void => setAnimating(handlingClick),
      [handlingClick, setAnimating],
    );

    const handleClick: MouseEventHandler = (event) => {
      if (handlingClick || !onClick) {
        return;
      }

      setAnimating(true);
      void executeLazyPromise(
        () => onClick(event) as Promise<void>,
        setHandlingClick,
      );
    };

    const renderStartSlot = useCallback(
      (): React.ReactNode =>
        hasLeading ? (
          start ? (
            <div {...getStyles(['slot', 'slot$start'])}>{start}</div>
          ) : (
            <div {...getStyles(['slot', 'slot$start', 'slot$icon'])}>
              {loading ? (
                <IndeterminateCircularProgressIndicator
                  {...getStyles(['icon', hasOverlay && 'invisible'])}
                />
              ) : (
                <div
                  {...getStyles(['icon', hasOverlay && 'invisible'])}
                  onAnimationIteration={handleAnimationIteration}
                >
                  {leadingIcon}
                </div>
              )}
            </div>
          )
        ) : (
          <div {...getStyles(['slot', 'slot$icon', 'slot$icon$collapsed'])} />
        ),
      [
        start,
        getStyles,
        hasOverlay,
        hasLeading,
        loading,
        leadingIcon,
        handleAnimationIteration,
      ],
    );

    const renderEndSlot = useCallback(
      (): React.ReactNode =>
        hasTrailing ? (
          end ? (
            <div {...getStyles(['slot', 'slot$end'])}>{end}</div>
          ) : (
            <div {...getStyles(['slot', 'slot$end', 'slot$icon'])}>
              {loading && !leadingIcon ? (
                <IndeterminateCircularProgressIndicator
                  {...getStyles(['icon', hasOverlay && 'invisible'])}
                />
              ) : (
                <div
                  {...getStyles(['icon', hasOverlay && 'invisible'])}
                  onAnimationIteration={handleAnimationIteration}
                >
                  {trailingIcon}
                </div>
              )}
            </div>
          )
        ) : (
          <div {...getStyles(['slot', 'slot$icon', 'slot$icon$collapsed'])} />
        ),
      [
        end,
        getStyles,
        hasOverlay,
        hasTrailing,
        loading,
        trailingIcon,
        handleAnimationIteration,
      ],
    );

    const renderLabelSlot = useCallback(
      () => (
        <span {...getStyles(['label', hasOverlay && 'invisible'])}>
          {children}
        </span>
      ),
      [children, getStyles, hasOverlay],
    );

    const renderOverlay = useCallback(
      (): React.ReactNode => (
        <div {...getStyles('overlay')}>
          {loadingText ? (
            <span {...getStyles('label')}>{loadingText}</span>
          ) : (
            <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
          )}
        </div>
      ),
      [getStyles, loadingText],
    );

    return (
      <ButtonBase
        {...getStyles('root')}
        onClick={onClick ? handleClick : undefined}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
          outline: getStyles('outline').className,
        })}
        readOnly={readOnly}
        ref={forwardedRef}
        {...other}
      >
        {renderStartSlot()}
        {children && renderLabelSlot()}
        {hasOverlay && renderOverlay()}
        {renderEndSlot()}
      </ButtonBase>
    );
  },
);

Button.theme = buttonTheme;
Button.displayName = `@sixui/${COMPONENT_NAME}`;
