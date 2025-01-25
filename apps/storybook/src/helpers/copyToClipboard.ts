import { deselectCurrent } from './deselectCurrent';

// Inspiration:
// - https://github.com/patternfly/patternfly-react/blob/main/packages/react-core/src/components/ClipboardCopy/ClipboardCopy.tsx

export const copyToClipboard = (text: string): Promise<void> => {
  const reselectPrevious = deselectCurrent();

  return navigator.clipboard
    .writeText(text)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(
        "Clipboard API not found, this copy function will not work. This is likely because you're using an unsupported browser or you're not using HTTPS.",
      );

      // eslint-disable-next-line no-console
      console.error(error);
    })
    .finally(() => reselectPrevious?.());
};
