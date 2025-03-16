import type { ILabeledProps } from '~/components/Labeled';
import type { IMultiSelectFactory } from './MultiSelect.types';
import type { IMultiSelectControlProps } from './MultiSelectControl';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './MultiSelect.constants';
import { MultiSelectControl } from './MultiSelectControl';
import { multiSelectTheme } from './MultiSelect.css';

export const MultiSelect = componentFactory<IMultiSelectFactory>(
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
          <MultiSelectControl
            ref={forwardedRef}
            {...labeledControlProps}
            {...(foreignProps as unknown as IMultiSelectControlProps)}
            {...controlProps}
          />
        )}
      </Labeled>
    );
  },
);

MultiSelect.displayName = `@sixui/core/${COMPONENT_NAME}`;
MultiSelect.theme = multiSelectTheme;
MultiSelect.Control = MultiSelectControl;
