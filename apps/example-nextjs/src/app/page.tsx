'use client';

import { Button, ConfirmDialogOverlay, useOverlays } from '@sixui/core';

export default function Home() {
  const overlays = useOverlays();

  return (
    <Button
      onClick={() =>
        overlays
          .open(ConfirmDialogOverlay, {
            modal: true,
            headline: 'Permanently delete?',
            children:
              'Deleting the selected messages will also remove them from all synced devices.',
            labels: {
              confirm: 'Delete',
            },
            confirmProps: {
              variant: 'danger',
            },
          })
          .then((confirmed) => console.log('confirmed?', confirmed))
      }
    >
      Hello World!
    </Button>
  );
}
