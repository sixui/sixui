import type {
  ICircularProgressIndicatorFactory,
  ICircularProgressIndicatorProps,
} from './CircularProgressIndicator.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { DeterminateCircularProgressIndicator } from '~/components/DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './CircularProgressIndicator.constants';
import { circularProgressIndicatorTheme } from './CircularProgressIndicator.css';

/**
 * @see https://m3.material.io/components/progress-indicators/overview
 */
export const CircularProgressIndicator =
  componentFactory<ICircularProgressIndicatorFactory>((props, forwardedRef) => {
    const { value, ...other } = props;
    const { boxProps } =
      extractBoxProps<ICircularProgressIndicatorProps>(other);

    return value === undefined ? (
      <IndeterminateCircularProgressIndicator
        ref={forwardedRef}
        disabled={other.disabled}
        {...boxProps}
      >
        {other.children}
      </IndeterminateCircularProgressIndicator>
    ) : (
      <DeterminateCircularProgressIndicator
        ref={forwardedRef}
        value={value}
        {...other}
      />
    );
  });

CircularProgressIndicator.theme = circularProgressIndicatorTheme;
CircularProgressIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
