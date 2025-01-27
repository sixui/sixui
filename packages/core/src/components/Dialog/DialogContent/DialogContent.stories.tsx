import type { Meta, StoryObj } from '@storybook/react';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IDialogContentProps } from './DialogContent.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text } from '~/components/Text';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { DialogContent } from './DialogContent';

// https://m3.material.io/components/dialogs/overview
// https://material-web.dev/components/dialog/
// https://github.com/material-components/material-web/blob/main/dialog/demo/stories.ts

const meta = {
  component: DialogContent,
} satisfies Meta<typeof DialogContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: px(480),
  h: 'fit-content',
  headline: 'Permanently delete?',
  children:
    'Deleting the selected messages will also remove them from all synced devices.',
  onClose: () => void sbHandleEvent('onClose', undefined, 500),
  actions: ({ close }) => (
    <>
      <Button variant="text" onClick={close}>
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={() => sbHandleEvent('onClick', undefined, 500)}
      >
        Delete
      </Button>
    </>
  ),
} satisfies Partial<IDialogContentProps>;

const DialogContentShowcase = componentShowcaseFactory(DialogContent);

export const Basic: IStory = {
  render: (props) => <DialogContent {...props} />,
  args: defaultArgs,
};

export const Sizes: IStory = {
  render: (props) => (
    <DialogContentShowcase
      props={props}
      horizontalAlign="start"
      rows={[
        { legend: 'Extra small', props: { size: 'xs' } },
        { legend: 'Small', props: { size: 'sm' } },
        { legend: 'Medium', props: { size: 'md' } },
        { legend: 'Large', props: { size: 'lg' } },
        { legend: 'Extra large', props: { size: 'xl' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    headline: 'Headline',
    children: 'Content',
    actions: undefined,
  },
};

export const Scales: IStory = {
  render: (props) => (
    <DialogContentShowcase
      props={props}
      horizontalAlign="start"
      rows={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const WithIcon: IStory = {
  render: (props) => <DialogContent {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faTrashCan} />,
  },
};

export const Scrollable: IStory = {
  render: (props) => <DialogContent {...props} />,
  args: {
    ...defaultArgs,
    children: (
      <>
        <Text gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
          ullamcorper nisl. In ut diam sapien. Proin orci mauris, pretium ac
          ante ut, porta fermentum ipsum. Proin at lobortis turpis, a rhoncus
          massa.
        </Text>
        <Text gutterBottom>
          Praesent tincidunt, turpis hendrerit cursus dictum, lectus nisi porta
          velit, non luctus nibh arcu vitae erat. Sed ac imperdiet nisl. Donec
          pellentesque, nibh in dapibus tristique, lectus justo efficitur lacus,
          id semper nibh dui vitae erat. Suspendisse suscipit felis quis
          hendrerit elementum.
        </Text>
        <Text gutterBottom>
          Sed posuere vestibulum magna, id fermentum nunc pellentesque nec.
          Nullam dolor felis, feugiat id venenatis ac, rutrum eu ipsum. Duis
          tempus eleifend augue eu consequat. Proin venenatis, velit sit amet
          vehicula dictum, leo eros porta ipsum, sed sodales metus mi a massa.
        </Text>
        <Text>
          Donec a diam sed nibh viverra rutrum. Duis in elementum metus.
          Vestibulum a dolor sollicitudin, maximus eros faucibus, commodo diam.
          Maecenas dictum ornare quam quis imperdiet.
        </Text>
      </>
    ),
    scrollable: true,
    h: '$72',
  },
};

export default meta;
