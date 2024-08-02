import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  SnackbarContentPlaygroundDemo,
  ISnackbarContentPlaygroundDemoProps,
} from './SnackbarContentPlaygroundDemo';

export const snackbarcontentPlaygroundSections: IPlaygroundSections<ISnackbarContentPlaygroundDemoProps> =
  {
    snackbarContent: {
      title: 'SnackbarContent',
      props: {
        children: 'Your photo has been archived.',
      },
      options: [
        {
          label: 'Action',
          props: {
            actionLabel: 'Undo',
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Close icon',
          props: {
            showCloseButton: true,
          },
          modifiers: {
            off: true,
          },
        },
      ],
    },
  };

export const SnackbarContentPlayground: React.FC = (props) => {
  return (
    <Playground<ISnackbarContentPlaygroundDemoProps>
      {...props}
      defaultSections={snackbarcontentPlaygroundSections}
      componentRenderer={(props) => (
        <SnackbarContentPlaygroundDemo {...props} />
      )}
    />
  );
};
