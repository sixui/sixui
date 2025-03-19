import type { Meta, StoryObj } from '@storybook/react';
import { faBolt, faCloud, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IAvatarProps } from './Avatar.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

type IStory = StoryObj<IAvatarProps>;

// https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjQxfHxWaXNhZ2V8ZW58MHx8MHx8fDI%3D

const AVATAR_IMAGE_URL_1 =
  'https://avatars.githubusercontent.com/u/2182039?v=4&s=256';
const AVATAR_IMAGE_URL_2 =
  'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const AVATAR_IMAGE_URL_3 =
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const rows: Array<IComponentPresentation<IAvatarProps>> = [
  { legend: 'Rounded' },
  { legend: 'Squared', props: { shape: '$sm' } },
];

const AvatarShowcase = componentShowcaseFactory(Avatar);

export const Variants: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        {},
        {
          props: {
            src: AVATAR_IMAGE_URL_1,
          },
        },
        { props: { children: 'op' } },
        { props: { children: <FontAwesomeIcon icon={faStar} /> } },
        { props: { src: '/broken-image.jpg', alt: 'Olivier' } },
      ]}
      rows={rows}
    />
  ),
};

export const Scales: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
};

export const Densities: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        { legend: '-3', props: { density: -3 } },
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
};

export const Image: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        {
          props: {
            src: AVATAR_IMAGE_URL_1,
            alt: 'Jane Doe',
          },
        },
        {
          props: {
            src: AVATAR_IMAGE_URL_2,
            alt: 'John Doe',
          },
        },
        {
          props: {
            src: AVATAR_IMAGE_URL_3,
            alt: 'Olivier Pascal',
          },
        },
      ]}
      rows={rows}
    />
  ),
};

export const Letter: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        { props: { children: 'J' } },
        { props: { children: 'R' } },
        { props: { children: 'OP' } },
      ]}
    />
  ),
};

export const Icon: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        { props: { children: <FontAwesomeIcon icon={faStar} /> } },
        { props: { children: <FontAwesomeIcon icon={faBolt} /> } },
        { props: { children: <FontAwesomeIcon icon={faCloud} /> } },
      ]}
      rows={rows}
    />
  ),
};

export const Fallback: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        { props: { src: '/broken-image.jpg', alt: 'John Doe' } },
        { props: { src: '/broken-image.jpg', alt: 'Richard Roe' } },
        { props: { src: '/broken-image.jpg' } },
      ]}
      rows={rows}
    />
  ),
};

export const Colors: IStory = {
  render: (props) => (
    <AvatarShowcase
      props={props}
      cols={[
        { props: { children: 'AB' } },
        { props: { children: 'CD' } },
        { props: { children: 'EF' } },
        { props: { children: 'GH' } },
        { props: { children: 'IJ' } },
        { props: { children: 'KL' } },
        { props: { children: 'MN' } },
        { props: { children: 'OP' } },
      ]}
      rows={rows}
    />
  ),
  args: {
    fallbackToRandomColor: true,
  },
};

export default meta;
