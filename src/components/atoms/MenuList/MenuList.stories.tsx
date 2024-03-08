import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { MenuList, type IMenuListProps } from './MenuList';
import { ListItem } from '../ListItem';

const meta = {
  component: MenuList,
} satisfies Meta<typeof MenuList>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 192,
  },
});

const defaultArgs = {} satisfies Partial<IMenuListProps>;

const items = ['Apple', 'Banana', 'Cumcumber'].map((name) => (
  <ListItem key={name} type='link'>
    {name}
  </ListItem>
));

// const MenuListLauncher: React.FC<IMenuList> = (props) => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = (): void => setOpen(true);
//   const handleClose = (): void => setOpen(false);

//   return (
//     <>
//       <Dialog
//         actions={
//           <>
//             <Button variant='text' onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant='text' onClick={handleClose}>
//               OK
//             </Button>
//           </>
//         }
//         {...props}
//         open={open}
//         onClose={handleClose}
//       />
//       <Button onClick={handleOpen}>Open</Button>
//     </>
//   );
// };

export const Basic: IStory = {
  render: (props) => (
    <div {...stylex.props(styles.host)}>
      <MenuList {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    children: (
      <>
        {items}
        <MenuList.Divider />
        {items}
      </>
    ),
  },
};

export default meta;
