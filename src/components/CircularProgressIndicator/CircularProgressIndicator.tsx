import type { ICircularProgressIndicatorFactory } from './CircularProgressIndicator.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { DeterminateCircularProgressIndicator } from '../DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { circularProgressIndicatorTheme } from './CircularProgressIndicator.css';

const COMPONENT_NAME = 'CircularProgressIndicator';

export const CircularProgressIndicator =
  componentFactory<ICircularProgressIndicatorFactory>((props, forwardedRef) => {
    const { value } = props;

    return value === undefined ? (
      <IndeterminateCircularProgressIndicator {...props} ref={forwardedRef} />
    ) : (
      <DeterminateCircularProgressIndicator
        {...props}
        ref={forwardedRef}
        value={value}
      />
    );
  });

CircularProgressIndicator.theme = circularProgressIndicatorTheme;
CircularProgressIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
