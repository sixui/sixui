import { useEffect, useRef, useState } from 'react';

import type { IWindowSizeClassContainerName } from '~/helpers/getResponsiveRules';
import { usePrevious } from '~/hooks/usePrevious';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';

export type IUseSideSheetResult = {
  isModal: boolean;
  standardOpened: boolean;
  modalOpened: boolean;
};

export type IUseSideSheetProps = {
  opened?: boolean;
  standardFromWindowSizeClass?: IWindowSizeClassContainerName;
  onOpen?: () => void;
  onClose?: () => void;
};

export const useSideSheet = (
  props: IUseSideSheetProps,
): IUseSideSheetResult => {
  const {
    opened = false,
    standardFromWindowSizeClass = 'largeAndUp',
    onOpen,
    onClose,
  } = props;

  const windowSizeClass = useWindowSizeClass();
  const [modalOpened, setModalOpened] = useState(false);
  const savedStandardOpenedRef = useRef(opened);
  const previousOpened = usePrevious(opened);
  const isModal = !windowSizeClass?.[standardFromWindowSizeClass];
  const previousIsModal = usePrevious(isModal);

  useEffect(() => {
    // This effect is triggered when the state of the side sheet changes
    // from opened to closed or vice versa. It is used to manage the state
    // of the modal side sheet, which is managed separately from the
    // standard side sheet.
    if (previousOpened === opened) {
      return;
    }

    // If the window size is compact, the side sheet should be displayed as
    // a modal side sheet.
    setModalOpened(isModal && !!opened);
  }, [isModal, opened, previousOpened]);

  useEffect(() => {
    // This effect is triggered when the window size changes from compact to
    // non-compact or vice versa. It is used to manage the state of the standard
    // side sheet when the window size changes.
    if (previousIsModal === isModal) {
      return;
    }

    // If the window size has grown from compact to non-compact, the modal
    // side sheet should already be removed from the DOM. Here we ensure
    // that its state is closed to prevent any glitch like a closing
    // animation when the window size shrinks back to compact.
    setModalOpened(false);

    if (isModal) {
      // If the window size has shrunk from non-compact to compact, the side
      // sheet is closed. The next time it is opened, it should be displayed
      // as a modal side sheet.
      onClose?.();
      // The open state is saved in a ref to ensure that the modal side
      // sheet is re-opened when the window size grows back to non-compact.
      savedStandardOpenedRef.current = opened;
    } else if (savedStandardOpenedRef.current) {
      // If the window size has grown back to non-compact and the standard
      // side sheet was open, it should be re-opened.
      onOpen?.();
    }
  }, [isModal, previousIsModal, opened, onOpen, onClose]);

  return {
    isModal,
    standardOpened: !isModal && opened,
    modalOpened: modalOpened,
  };
};
