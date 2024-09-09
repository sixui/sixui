import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faChevronRight,
  faCheck,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IListItemProps, IListItemVariant } from './ListItem.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Avatar } from '../Avatar';
import { ListItem } from './ListItem';

// https://m3.material.io/components/items/overview
// https://material-web.dev/components/item/
// https://github.com/material-components/material-web/blob/main/labs/item/demo/stories.ts

const meta = {
  component: ListItem,
} satisfies Meta<typeof ListItem>;

type IStory = StoryObj<typeof meta>;

const LOREM$XS = 'Lorem ipsum dolor sit amet.';
const LOREM$SM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

// const styles = stylex.create({
//   host: {
//     outlineWidth: outlineTokens.width$xs,
//     outlineStyle: 'dashed',
//     outlineColor: colorSchemeTokens.outlineVariant,
//   },
//   host$fixedWidth$xs: {
//     width: `calc(160px * ${scaleTokens.scale})`,
//   },
//   host$fixedWidth$sm: {
//     width: `calc(240px * ${scaleTokens.scale})`,
//   },
//   host$fixedWidth$md: {
//     width: `calc(320px * ${scaleTokens.scale})`,
//   },
// });

const defaultArgs = {
  onPress: (...args) => sbHandleEvent('onPress', args, 1000),
  outlineStyle: 'dashed',
  w: '$40',
} satisfies Partial<IListItemProps>;

const states: Array<IComponentPresentation<IListItemProps>> = [
  { legend: 'Normal', props: { children: 'Normal' } },
  {
    legend: 'Focused',
    props: { children: 'Focused', interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { children: 'Hovered', interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { children: 'Pressed', interactions: { pressed: true } },
  },
  { legend: 'Selected', props: { children: 'Selected', selected: true } },
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<IListItemProps>> = [
  { legend: 'Basic' },
  {
    legend: 'With leading icon',
    props: {
      leadingIcon: <FontAwesomeIcon icon={faCheck} />,
    },
  },
  {
    legend: 'With trailing icon',
    props: {
      trailingIcon: <FontAwesomeIcon icon={faLink} />,
    },
  },
  {
    legend: 'With leading element',
    props: {
      leading: <Avatar>A</Avatar>,
    },
  },
  {
    legend: 'With leading image',
    props: {
      leadingImage:
        'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&h=168&w=168',
    },
  },
  {
    legend: 'With leading video',
    props: {
      leadingVideo: [
        {
          type: 'video/webm',
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        },
        {
          type: 'video/mp4',
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        },
      ],
    },
  },
  // FIXME:
  // {
  //   legend: 'With trailing element',
  //   props: {
  //     trailing: <Checkbox checked />,
  //   },
  // },
  {
    legend: 'With overline',
    props: {
      overline: 'Overline',
    },
  },
  {
    legend: 'With supporting text',
    props: {
      supportingText: 'Supporting text',
    },
  },
  {
    legend: 'With trailing supporting text',
    props: {
      trailingSupportingText: '100+',
    },
  },
];

const ListItemShowcase = makeComponentShowcase(ListItem);

// export const Variants: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={ListItem}
//       props={props}
//       cols={(['standard', 'danger'] as Array<IListItemVariant>).map(
//         (variant) => ({
//           props: {
//             variant,
//             children: capitalizeFirstLetter(variant),
//             leadingIcon: <FontAwesomeIcon icon={faCalendarDays} />,
//             trailingIcon: <FontAwesomeIcon icon={faChevronRight} />,
//             onClick: () => {},
//           },
//         }),
//       )}
//     />
//   ),
//   args: defaultArgs,
// };

// export const Sizes: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={ListItem}
//       props={props}
//       cols={[
//         { legend: 'Small (sm)', props: { size: 'sm' } },
//         { legend: 'Medium (md)', props: { size: 'md' } },
//         {
//           legend: 'Large (lg)',
//           props: { size: 'lg', supportingText: 'Supporting text' },
//         },
//         {
//           legend: 'Extra large (xl)',
//           props: {
//             size: 'xl',
//             supportingText:
//               'Supporting text that is long enough to fill up multiple lines',
//           },
//         },
//       ]}
//     />
//   ),
//   args: {
//     ...defaultArgs,
//     sx: [styles.host, styles.host$fixedWidth$sm],
//     leading: <Avatar>A</Avatar>,
//     children: 'Label',
//   },
// };

// export const Lengths: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={ListItem}
//       horizontalAlign='start'
//       props={props}
//       rows={[
//         { legend: 'Basic', props: { children: LOREM$XS } },
//         {
//           legend: 'Long text',
//           props: {
//             children: LOREM$SM,
//           },
//         },
//         {
//           legend: 'Fixed width',
//           props: {
//             children: LOREM$SM,
//             sx: [styles.host, styles.host$fixedWidth$md],
//           },
//         },
//         {
//           legend: 'Fixed width, one line max',
//           props: {
//             children: LOREM$SM,
//             sx: [styles.host, styles.host$fixedWidth$xs],
//             maxLines: 1,
//           },
//         },
//         {
//           legend: 'Fixed width, two lines max',
//           props: {
//             children: LOREM$SM,
//             sx: [styles.host, styles.host$fixedWidth$xs],
//             maxLines: 2,
//           },
//         },
//       ]}
//     />
//   ),
//   args: defaultArgs,
// };

export const Standard: IStory = {
  render: (props) => (
    <ListItemShowcase
      horizontalAlign='start'
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'standard',
    children: 'Label',
  },
};

// export const Danger: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={ListItem}
//       horizontalAlign='start'
//       props={props}
//       cols={states}
//       rows={rows}
//     />
//   ),
//   args: {
//     ...defaultArgs,
//     variant: 'danger',
//     children: 'Label',
//     onClick: (...args) => void sbHandleEvent('click', args),
//     sx: [styles.host, styles.host$fixedWidth$xs],
//   },
// };

export default meta;
