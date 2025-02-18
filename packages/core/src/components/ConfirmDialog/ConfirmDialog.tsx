import { useState } from 'react';

import type { IConfirmDialogThemeFactory } from './ConfirmDialog.css';
import type { IConfirmDialogFactory } from './ConfirmDialog.types';
import { Button } from '~/components/Button';
import { Dialog } from '~/components/Dialog';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './ConfirmDialog.constants';
import { confirmDialogTheme } from './ConfirmDialog.css';

const defaultLabels = {
  confirm: 'Confirm',
  cancel: 'Cancel',
};

export const ConfirmDialog = componentFactory<IConfirmDialogFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      onCancel = () => {},
      onConfirm = () => {},
      cancelProps,
      confirmProps,
      labels: labelsProp,
      danger,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IConfirmDialogThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: confirmDialogTheme,
    });

    const [canceling, setCanceling] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const loading = canceling || confirming;

    const labels = { ...defaultLabels, ...labelsProp };

    return (
      <Dialog
        {...getStyles('root')}
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

ConfirmDialog.theme = confirmDialogTheme;
ConfirmDialog.displayName = `@sixui/core/${COMPONENT_NAME}`;
