import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Avatar, type IAvatarProps } from './Avatar';

const meta = {
  component: Avatar,
  // tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAvatarProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      cols={[
        {
          props: {
            src: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {},
        { props: { children: 'OP' } },
        { props: { children: <FontAwesomeIcon icon={faStar} /> } },
        { props: { src: '/broken-image.jpg', alt: 'Olivier' } },
      ]}
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
            src: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            alt: 'John Doe',
          },
        },
        {
          props: {
            src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            alt: 'Jane Doe',
          },
        },
        {
          props: {
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            alt: 'Olivier Pascal',
          },
        },
      ]}
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
    />
  ),
  args: defaultArgs,
};

export default meta;
