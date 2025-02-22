import { Box, Button, ConfirmDialogOverlay, useOverlays } from '@sixui/core';

export const Demo: React.FC = () => {
  const overlays = useOverlays();

  return (
    <Box grow={1} p="$3" bg="$surface">
      <Button
        onClick={() =>
          overlays.open(ConfirmDialogOverlay, {
            modal: true,
            headline: 'Do you enjoy Sixui?',
            children:
              "If you don't, I will be sad. Anyway, feel free to tell me what you do like and don't like about it.",
            labels: {
              confirm: 'I absolutely love it',
              cancel: 'Ask me later',
            },
          })
        }
      >
        Open a confirm dialog
      </Button>
    </Box>
  );
};
