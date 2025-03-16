import type { ILabeledProps } from '~/components/Labeled';
import type { IColorInputFactory } from './ColorInput.types';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorInput.constants';
import { ColorInputControl } from './ColorInputControl';
import { colorInputTheme } from './ColorInput.css';

export const ColorInput = componentFactory<IColorInputFactory>(
  (props, forwardedRef) => {
    const { labeledProps, controlProps, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <Labeled
        {...labeledProps}
        {...(other as ILabeledProps)}
        forwardForeignProps
      >
        {({ foreignProps, ...labeledControlProps }) => (
          <ColorInputControl
            ref={forwardedRef}
            {...labeledControlProps}
            {...foreignProps}
            {...controlProps}
          />
        )}
      </Labeled>
    );
  },
);

ColorInput.displayName = `@sixui/core/${COMPONENT_NAME}`;
ColorInput.theme = colorInputTheme;
ColorInput.Control = ColorInputControl;
