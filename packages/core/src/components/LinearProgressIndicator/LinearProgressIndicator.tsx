import type { ILinearProgressIndicatorFactory } from './LinearProgressIndicator.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { DeterminateLinearProgressIndicator } from '~/components/DeterminateLinearProgressIndicator';
import { IndeterminateLinearProgressIndicator } from '~/components/IndeterminateLinearProgressIndicator';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './LinearProgressIndicator.constants';
import { linearProgressIndicatorTheme } from './LinearProgressIndicator.css';

/**
 * @see https://m3.material.io/components/progress-indicators/overview
 */
export const LinearProgressIndicator =
  componentFactory<ILinearProgressIndicatorFactory>((props, forwardedRef) => {
    const { value, ...other } = props;
    const { boxProps } = extractBoxProps(other);

    return value === undefined ? (
      <IndeterminateLinearProgressIndicator
        ref={forwardedRef}
        disabled={other.disabled}
        {...boxProps}
      >
        {other.children}
      </IndeterminateLinearProgressIndicator>
    ) : (
      <DeterminateLinearProgressIndicator
        ref={forwardedRef}
        value={value}
        {...other}
      />
    );
  });

LinearProgressIndicator.theme = linearProgressIndicatorTheme;
LinearProgressIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
