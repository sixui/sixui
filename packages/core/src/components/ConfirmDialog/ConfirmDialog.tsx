import { useState } from 'react';

import type { IConfirmDialogFactory } from './ConfirmDialog.types';
import { Button } from '~/components/Button';
import { Dialog } from '~/components/Dialog';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './ConfirmDialog.constants';

const defaultLabels = {
  confirm: 'Confirm',
  cancel: 'Cancel',
};

export const ConfirmDialog = componentFactory<IConfirmDialogFactory>(
  (props, forwardedRef) => {
    const {
      onCancel = () => {},
      onConfirm = () => {},
      cancelProps,
      confirmProps,
      labels: labelsProp,
      danger,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [canceling, setCanceling] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const loading = canceling || confirming;

    const labels = { ...defaultLabels, ...labelsProp };

    return (
      <Dialog
        ref={forwardedRef}
        onClosed={() => {
          setCanceling(false);
          setConfirming(false);
        }}
        actions={({ close }) => (
          <>
            <Button
              readOnly={loading}
              loading={canceling}
              onClick={() =>
                executeLazyPromise(onCancel, setCanceling, {
                  resetEvent: 'error',
                }).then(close)
              }
              variant="text"
              {...cancelProps}
            >
              {labels.cancel}
            </Button>
            <Button
              readOnly={loading}
              loading={confirming}
              onClick={() =>
                executeLazyPromise(onConfirm, setConfirming, {
                  resetEvent: 'error',
                }).then(close)
              }
              variant={danger ? 'danger' : undefined}
              {...confirmProps}
            >
              {labels.confirm}
            </Button>
          </>
        )}
        {...other}
      />
    );
  },
);

ConfirmDialog.displayName = `@sixui/core/${COMPONENT_NAME}`;
