import type { IBottomSheetThemeFactory } from './BottomSheet.css';
import type {
  IBottomSheetFactory,
  IBottomSheetOwnProps,
} from './BottomSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { BottomSheetContent } from '../BottomSheetContent';
import { PopoverBase } from '../PopoverBase';
import { bottomSheetTheme } from './BottomSheet.css';

const COMPONENT_NAME = 'BottomSheet';

export const BottomSheet = componentFactory<IBottomSheetFactory>(
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

    const { getStyles } = useComponentTheme<IBottomSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: bottomSheetTheme,
    });

    return (
      <PopoverBase
        {...getStyles('root')}
        contentRenderer={({ close, forwardedProps }) => (
          <BottomSheetContent
            ref={forwardedRef}
            {...mergeProps(
              { onClose: close },
              forwardedProps as IBottomSheetOwnProps,
            )}
          >
            {children}
          </BottomSheetContent>
        )}
        closeEvents={false}
        middlewares={{
          flip: false,
          shift: false,
          size: false,
        }}
        forwardProps
        {...other}
      />
    );
  },
);

BottomSheet.theme = bottomSheetTheme;
BottomSheet.displayName = `@sixui/${COMPONENT_NAME}`;
