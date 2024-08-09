import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import {
  DialogContentPlaygroundDemo,
  IDialogContentPlaygroundDemoProps,
} from './DialogContentPlaygroundDemo';

export const dialogcontentPlaygroundSections: IPlaygroundSections<IDialogContentPlaygroundDemoProps> =
  {
    dialogContent: {
      title: 'DialogContent',
      props: {
        headline: 'Permanently delete?',
        children:
          'Deleting the selected messages will also remove them from all synced devices.',
      },
      options: [
        {
          label: 'Icon',
          props: {
            icon: <FontAwesomeIcon icon={faTrashCan} />,
          },
        },
        {
          label: 'Actions',
          props: {
            actions: (
              <>
                <Button variant='text'>Cancel</Button>
                <Button variant='danger'>Delete</Button>
              </>
            ),
          },
          modifiers: {
            on: true,
          },
        },
        {
          label: 'Scrollable',
          props: {
            scrollable: true,
            children: (
              <>
                <Text gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
                  ullamcorper nisl. In ut diam sapien. Proin orci mauris,
                  pretium ac ante ut, porta fermentum ipsum. Proin at lobortis
                  turpis, a rhoncus massa.
                </Text>
                <Text gutterBottom>
                  Praesent tincidunt, turpis hendrerit cursus dictum, lectus
                  nisi porta velit, non luctus nibh arcu vitae erat. Sed ac
                  imperdiet nisl. Donec pellentesque, nibh in dapibus tristique,
                  lectus justo efficitur lacus, id semper nibh dui vitae erat.
                  Suspendisse suscipit felis quis hendrerit elementum.
                </Text>
                <Text gutterBottom>
                  Sed posuere vestibulum magna, id fermentum nunc pellentesque
                  nec. Nullam dolor felis, feugiat id venenatis ac, rutrum eu
                  ipsum. Duis tempus eleifend augue eu consequat. Proin
                  venenatis, velit sit amet vehicula dictum, leo eros porta
                  ipsum, sed sodales metus mi a massa.
                </Text>
                <Text gutterBottom>
                  Donec a diam sed nibh viverra rutrum. Duis in elementum metus.
                  Vestibulum a dolor sollicitudin, maximus eros faucibus,
                  commodo diam. Maecenas dictum ornare quam quis imperdiet.
                </Text>
              </>
            ),
          },
        },
      ],
    },
  };

export const DialogContentPlayground: React.FC = (props) => {
  return (
    <Playground<IDialogContentPlaygroundDemoProps>
      {...props}
      defaultSections={dialogcontentPlaygroundSections}
      componentRenderer={(props) => <DialogContentPlaygroundDemo {...props} />}
    />
  );
};
