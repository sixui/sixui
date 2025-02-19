import type { ICircularProgressIndicatorFactory } from './CircularProgressIndicator.types';
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

    return value === undefined ? (
      <IndeterminateCircularProgressIndicator ref={forwardedRef} {...other} />
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
