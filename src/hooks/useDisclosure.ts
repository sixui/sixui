import { useCallback, useState } from 'react';

export type IUseDisclosureResult = readonly [
  boolean,
  {
    open: () => void;
    close: () => void;
    toggle: () => void;
  },
];

export const useDisclosure = (
  initialState = false,
  callbacks?: { onOpen?: () => void; onClose?: () => void },
): IUseDisclosureResult => {
  const { onOpen, onClose } = callbacks ?? {};
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened((previouslyOpened) => {
      if (!previouslyOpened) {
        onOpen?.();

        return true;
      }

      return previouslyOpened;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setOpened((previouslyOpened) => {
      if (previouslyOpened) {
        onClose?.();

        return false;
      }

      return previouslyOpened;
    });
  }, [onClose]);

  const toggle = useCallback(
    () => (opened ? close() : open()),
    [close, open, opened],
  );

  return [opened, { open, close, toggle }] as const;
};
