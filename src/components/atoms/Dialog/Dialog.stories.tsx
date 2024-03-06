import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Dialog, type IDialogProps } from './Dialog';
import { Button } from '../Button';
import { Typography } from '../Typography';

// https://m3.material.io/components/dialogs/overview
// https://material-web.dev/components/dialog/
// https://github.com/material-components/material-web/blob/main/dialog/demo/stories.ts

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  open: true,
} satisfies Partial<IDialogProps>;

const styles = stylex.create({
  scrollable: {
    height: 300,
  },
});

export const Basic: IStory = {
  render: (props) => <Dialog {...props} />,
  args: {
    ...defaultArgs,
    headline: 'Headline',
    content: 'Just a simple dialog.',
    actions: (
      <>
        <Button variant='text'>Close</Button>
        <Button variant='text'>OK</Button>
      </>
    ),
  },
};

export const WithIcon: IStory = {
  render: (props) => <Dialog {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faStar} />,
    headline: 'Headline',
    content: 'Just a simple dialog.',
    actions: (
      <>
        <Button variant='text'>Close</Button>
        <Button variant='text'>OK</Button>
      </>
    ),
  },
};

export const Scrollable: IStory = {
  render: (props) => <Dialog {...props} />,
  args: {
    ...defaultArgs,
    headline: 'Headline',
    content: (
      <>
        <Typography gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
          ullamcorper nisl. In ut diam sapien. Proin orci mauris, pretium ac
          ante ut, porta fermentum ipsum. Proin at lobortis turpis, a rhoncus
          massa. Praesent tincidunt, turpis hendrerit cursus dictum, lectus nisi
          porta velit, non luctus nibh arcu vitae erat. Sed ac imperdiet nisl.
          Donec pellentesque, nibh in dapibus tristique, lectus justo efficitur
          lacus, id semper nibh dui vitae erat. Suspendisse suscipit felis quis
          hendrerit elementum.
        </Typography>
        <Typography>
          Sed posuere vestibulum magna, id fermentum nunc pellentesque nec.
          Nullam dolor felis, feugiat id venenatis ac, rutrum eu ipsum. Duis
          tempus eleifend augue eu consequat. Proin venenatis, velit sit amet
          vehicula dictum, leo eros porta ipsum, sed sodales metus mi a massa.
          Donec a diam sed nibh viverra rutrum. Duis in elementum metus.
          Vestibulum a dolor sollicitudin, maximus eros faucibus, commodo diam.
          Maecenas dictum ornare quam quis imperdiet.
        </Typography>
      </>
    ),
    actions: (
      <>
        <Button variant='text'>Close</Button>
        <Button variant='text'>OK</Button>
      </>
    ),
    scrollable: true,
    sx: styles.scrollable,
  },
};

export default meta;
