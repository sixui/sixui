import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

import type { IAvatarProps } from './Avatar.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

type IStory = StoryObj<typeof meta>;

// https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjQxfHxWaXNhZ2V8ZW58MHx8MHx8fDI%3D

const AVATAR_IMAGE_URL_1 =
  'https://avatars.githubusercontent.com/u/2182039?v=4&s=256';
const AVATAR_IMAGE_URL_2 =
  'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
const AVATAR_IMAGE_URL_3 =
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const defaultArgs = {} satisfies Partial<IAvatarProps>;

const rows: Array<IComponentPresentation<IAvatarProps>> = [
  { legend: 'Rounded', props: { variant: 'rounded' } },
  { legend: 'Squared', props: { variant: 'squared' } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      cols={[
        {},
        {
          props: {
            src: AVATAR_IMAGE_URL_1,
          },
        },
        { props: { children: 'OP' } },
        { props: { children: <FontAwesomeIcon icon={faStar} /> } },
        { props: { src: '/broken-image.jpg', alt: 'Olivier' } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
  },
};

export const Image: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
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
  args: defaultArgs,
};

export const Letter: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      cols={[
        { props: { children: 'J' } },
        { props: { children: 'R' } },
        { props: { children: 'OP' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Icon: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      cols={[
        { props: { children: <FontAwesomeIcon icon={faStar} /> } },
        { props: { children: <FontAwesomeIcon icon={faBolt} /> } },
        { props: { children: <FontAwesomeIcon icon={faCloud} /> } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export const Fallback: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      cols={[
        { props: { src: '/broken-image.jpg', alt: 'John Doe' } },
        { props: { src: '/broken-image.jpg', alt: 'Richard Roe' } },
        { props: { src: '/broken-image.jpg' } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export const Colors: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
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
    ...defaultArgs,
    fallbackToRandomColor: true,
  },
};

export default meta;
