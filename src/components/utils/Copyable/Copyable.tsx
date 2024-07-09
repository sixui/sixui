import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import stylex from '@stylexjs/stylex';

import type { IContainerProps } from '@/helpers/types';
import { copyToClipboard } from '@/helpers/copyToClipboard';
import { isFunction } from 'lodash';
import { PlainTooltip } from '@/components/atoms/PlainTooltip';
import {
  useVisualState,
  type IVisualState,
} from '@/components/utils/VisualState';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

export type ICopyableTriggerRenderProps = {
  copy: () => Promise<void>;
  disabled?: boolean;
  setRef: ((element: Element | null) => void) | null;
};

export type ICopyableProps = IContainerProps & {
  trigger:
    | React.ReactNode
    | ((props: ICopyableTriggerRenderProps) => React.ReactNode);
  children?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  visualState?: IVisualState;
};

const styles = stylex.create({
  host: {
    display: 'inline-flex',
    gap: '0.5em',
    borderRadius: shapeVars.corner$xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    // textDecoration: 'underline',
    // textDecorationStyle: 'dashed',
  },
  text$hover: {},
  trigger: {
    fontSize: '1em',
    visibility: 'hidden',
  },
  trigger$hover: {
    visibility: 'visible',
  },
});

export const Copyable = forwardRef<HTMLDivElement, ICopyableProps>(
  function Copyable(props, forwardedRef) {
    const {
      sx,
      trigger,
      children,
      text,
      disabled,
      visualState: visualStateProp,
      ...other
    } = props;
    const { visualState, setRef: setVisualStateRef } = useVisualState(
      visualStateProp,
      { disabled },
    );
    const triggerElementRef = useRef<Element>(null);
    const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

    const handleCopy = async (): Promise<void> => {
      const textToCopy = text ?? children?.toString();
      if (!textToCopy) {
        return;
      }

      await copyToClipboard(textToCopy);
    };

    const triggerElement = isFunction(trigger)
      ? trigger({
          copy: handleCopy,
          disabled,
          setRef: triggerElementRef,
        })
      : trigger;
    // console.log('____', visualState);

    return (
      <span {...stylex.props(styles.host, sx)} {...other} ref={handleRef}>
        <span
          {...stylex.props(
            styles.text,
            visualState.hovered && styles.text$hover,
          )}
        >
          {children}
        </span>
        <PlainTooltip supportingText='Copy'>
          <span
            {...stylex.props(
              styles.trigger,
              visualState.hovered && styles.trigger$hover,
            )}
          >
            {triggerElement}
          </span>
        </PlainTooltip>
      </span>
    );
  },
);
