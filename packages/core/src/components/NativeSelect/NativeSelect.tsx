import type { ILabeledProps } from '~/components/Labeled';
import type { INativeSelectFactory } from './NativeSelect.types';
import type { INativeSelectControlProps } from './NativeSelectControl';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './NativeSelect.constants';
import { NativeSelectControl } from './NativeSelectControl';
import { nativeSelectTheme } from './NativeSelect.css';

export const NativeSelect = componentFactory<INativeSelectFactory>(
  (props, forwardedRef) => {
    const {
      onChange,
      labeledProps,
      controlProps,
      errorTextPosition = 'end',
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <Labeled
        errorTextPosition={errorTextPosition}
        {...labeledProps}
        {...(other as ILabeledProps)}
        forwardForeignProps
      >
        {({ foreignProps, ...labeledControlProps }) => (
          <NativeSelectControl
            ref={forwardedRef}
            onChange={onChange}
            {...labeledControlProps}
            {...(foreignProps as unknown as INativeSelectControlProps)}
            {...controlProps}
          />
        )}
      </Labeled>
    );
  },
);

NativeSelect.displayName = `@sixui/core/${COMPONENT_NAME}`;
NativeSelect.theme = nativeSelectTheme;
NativeSelect.Control = NativeSelectControl;
