import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IBaseProps } from './Base.types';
import { dataProps } from '~/helpers/dataProps';
import { isProduction } from '~/helpers/isProduction';
import {
  createPolymorphicComponent,
  IWithAsProp,
} from '~/utils/component/createPolymorphicComponent';

export const Base = createPolymorphicComponent<'div', IBaseProps>(
  forwardRef<HTMLDivElement, IBaseProps>(function Base(props, forwardedRef) {
    const { as, renderRoot, sx, visualState, ...other } =
      props as IWithAsProp<IBaseProps>;
    const Element = as ?? 'div';
    const childrenProps = {
      ...other,
      ref: forwardedRef,
      ...(typeof Element === 'string' && !renderRoot
        ? { ...stylex.props(sx), ...dataProps(visualState) }
        : { sx, visualState }),
    };

    if (!isProduction()) {
      const propKeys = Object.keys(other);
      if (propKeys.includes('className') || propKeys.includes('style')) {
        // eslint-disable-next-line no-console
        console.error(
          `sixui: The \`Base\` component does not support \`className\` or \`style\` props.`,
        );
      }
    }

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Element {...childrenProps} />
    );
  }),
);
