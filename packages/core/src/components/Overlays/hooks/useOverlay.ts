import { useCallback, useState } from 'react';

import type { IOverlayFC } from '../Overlays.types';
import { useOverlays } from './useOverlays';

export interface IUseOverlayResult<TProps extends object> {
  open: (props?: Partial<TProps>) => Promise<unknown>;
  close: () => void;
  toggle: (props?: Partial<TProps>) => Promise<unknown>;
}

export const useOverlay = <
  TProps extends {
    onClose?: () => void;
  },
>(
  Component: string | IOverlayFC<TProps>,
  defaultProps: TProps & {
    instanceId?: string;
  },
): IUseOverlayResult<TProps> => {
  const [instanceId, setInstanceId] = useState<string>();
  const overlays = useOverlays();

  const open = useCallback(
    (props?: Partial<TProps>) => {
      const finalProps = { ...defaultProps, ...props };

      const res = overlays.open(Component, {
        ...finalProps,
        onClose: () => {
          setInstanceId(undefined);
          finalProps.onClose?.();
        },
      });

      setInstanceId(res.instanceId);
      return res.promise;
    },
    [Component, defaultProps, overlays],
  );

  const close = useCallback(() => {
    if (instanceId) {
      overlays.close(instanceId);
      setInstanceId(undefined);
    }
  }, [instanceId, overlays]);

  const toggle = useCallback(
    (props?: Partial<TProps>): Promise<unknown> => {
      if (instanceId) {
        close();

        return Promise.resolve();
      }

      return open(props);
    },
    [instanceId, open, close],
  );

  return {
    open,
    close,
    toggle,
  };
};
