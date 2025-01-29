import { useCallback, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { IButtonThemeFactory } from './Button.css';
import type { IButtonFactory } from './Button.types';
import { ButtonBase } from '~/components/ButtonBase';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Overlayable } from '~/components/Overlayable';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { isFunction } from '~/helpers/isFunction';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Slot } from '../Slot';
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
      disabled,
      readOnly: readOnlyProp,
      hasStartSlot: hasStartSlotProp,
      hasEndSlot: hasEndSlotProp,
      startSlot,
      endSlot,
      animatedIconSlots,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [animating, setAnimating] = useState(false);
    const [handlingClick, setHandlingClick] = useState(false);
    const [iconSlotAnimating, setIconSlotAnimating] = useState(false);
    const loading =
      (loadingProp || handlingClick) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading;
    const disabledOrReadOnly = disabled || readOnly;

    const hasStart = hasStartSlotProp ?? (!!leadingIcon || !!startSlot);
    const hasEnd = hasEndSlotProp ?? (!!trailingIcon || !!endSlot);
    const hasOverlay = loading && (!!loadingText || (!hasStart && !hasEnd));
    const iconAnimation =
      (loadingProp || handlingClick || animating) &&
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
      variant,
      theme: buttonTheme,
      themeVariants: buttonThemeVariants,
      modifiers: {
        disabled: disabledOrReadOnly,
        loading,
        'with-children': !!children,
        'with-leading': hasStart,
        'with-trailing': hasEnd,
        'icon-animation': iconAnimation,
      },
    });

    const handleAnimationIteration = useCallback((): void => {
      setAnimating(handlingClick);
    }, [handlingClick, setAnimating]);

    const handleClick: React.MouseEventHandler = (event) => {
      if (handlingClick || !onClick) {
        return;
      }

      setAnimating(true);
      void executeLazyPromise(
        () => onClick(event) as Promise<void>,
        setHandlingClick,
      );
    };

    const startSlotTransitionNodeRef = useRef<HTMLDivElement>(null);
    const renderStartSlot2 = (): React.ReactNode =>
      animatedIconSlots ? (
        <CSSTransition
          nodeRef={startSlotTransitionNodeRef}
          in={loading || !!leadingIcon}
          timeout={150} // motionTokens.duration$short2
          unmountOnExit
        >
          {(status) => (
            <div
              {...getStyles(
                [
                  'slot',
                  'slot$icon',
                  'slot$icon$start',
                  'slot$icon$animated',
                  'slot$icon$animated$start',
                ],
                { modifiers: { 'animation-status': status } },
              )}
              ref={startSlotTransitionNodeRef}
            >
              {!!leadingIcon || !trailingIcon ? (
                <Overlayable
                  overlay={
                    <IndeterminateCircularProgressIndicator
                      {...getStyles('icon')}
                    />
                  }
                  visible={loading}
                >
                  <div
                    {...getStyles('icon')}
                    onAnimationIteration={handleAnimationIteration}
                  >
                    {leadingIcon}
                  </div>
                </Overlayable>
              ) : (
                <div
                  {...getStyles('icon')}
                  onAnimationIteration={handleAnimationIteration}
                >
                  {leadingIcon}
                </div>
              )}
            </div>
          )}
        </CSSTransition>
      ) : (
        leadingIcon &&
        (!!leadingIcon || !trailingIcon ? (
          <Overlayable
            overlay={
              <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
            }
            visible={loading}
          >
            {startSlot ? (
              <div {...getStyles('slot')}>{startSlot}</div>
            ) : (
              <div {...getStyles(['slot', 'slot$icon', 'slot$icon$start'])}>
                <div
                  {...getStyles('icon')}
                  onAnimationIteration={handleAnimationIteration}
                >
                  {leadingIcon}
                </div>
              </div>
            )}
          </Overlayable>
        ) : (
          <div {...getStyles(['slot', 'slot$icon', 'slot$icon$start'])}>
            {startSlot ? (
              <div {...getStyles('slot')}>{startSlot}</div>
            ) : (
              <div
                {...getStyles('icon')}
                onAnimationIteration={handleAnimationIteration}
              >
                {leadingIcon}
              </div>
            )}
          </div>
        ))
      );

    const renderStartSlot = (): React.ReactNode => (
      <Slot
        {...getStyles(['slot', 'slot$icon', 'slot$icon$start'])}
        animated={animatedIconSlots}
        opened={loading || !!leadingIcon}
        loading={loading && (!!leadingIcon || !trailingIcon)}
      >
        {startSlot ?? (
          <div
            {...getStyles('icon')}
            onAnimationIteration={handleAnimationIteration}
          >
            {leadingIcon}
          </div>
        )}
      </Slot>
    );

    // DEV:
    // const renderEndSlot = (children: React.ReactNode): React.ReactNode =>
    //   (hasEndSlot || animatedIconSlots) && (
    //     <Overlayable
    //       {...getStyles([
    //         'slot',
    //         !!children && 'slot$end',
    //         !start && 'slot$icon',
    //         !start && !hasEndSlot && 'slot$icon$collapsed',
    //       ])}
    //       overlay={
    //         <IndeterminateCircularProgressIndicator
    //           {...getStyles(['icon', 'slot$end'])}
    //         />
    //       }
    //       visible={loading && !leadingIcon}
    //     >
    //       {end ? (
    //         <div {...getStyles(['slot', !!children && 'slot$end'])}>{end}</div>
    //       ) : (
    //         <div
    //           {...getStyles(['slot', !!children && 'slot$end', 'slot$icon'])}
    //         >
    //           <div
    //             {...getStyles('icon')}
    //             onAnimationIteration={handleAnimationIteration}
    //           >
    //             {trailingIcon}
    //           </div>
    //         </div>
    //       )}
    //     </Overlayable>
    //   );

    const renderEndSlot = (children: React.ReactNode): React.ReactNode => null;

    const renderLabelSlot = (children: React.ReactNode): React.ReactNode =>
      children && (
        <Overlayable
          overlay={
            <>
              {loadingText ? (
                <span {...getStyles('label')}>{loadingText}</span>
              ) : (
                <IndeterminateCircularProgressIndicator
                  {...getStyles('icon')}
                />
              )}
            </>
          }
          visible={hasOverlay}
        >
          <span {...getStyles('label')}>{children}</span>
        </Overlayable>
      );

    const renderContent = (children: React.ReactNode): React.ReactNode => (
      <>
        {renderStartSlot()}
        {renderLabelSlot(children)}
        {renderEndSlot(children)}
      </>
    );

    return (
      <ButtonBase
        {...getStyles('root')}
        onClick={handleClick}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
          touchTarget: getStyles('touchTarget').className,
        })}
        disabled={disabled}
        readOnly={readOnly}
        ref={forwardedRef}
        {...other}
      >
        {({ renderFocusRing, renderStateLayer, renderTouchTarget }) =>
          isFunction(children) ? (
            children({
              renderFocusRing,
              renderStateLayer,
              renderContent,
              renderTouchTarget,
            })
          ) : (
            <>
              {renderFocusRing()}
              {renderStateLayer()}
              {renderContent(children)}
              {renderTouchTarget()}
            </>
          )
        }
      </ButtonBase>
    );
  },
);

Button.theme = buttonTheme;
Button.displayName = `@sixui/${COMPONENT_NAME}`;
