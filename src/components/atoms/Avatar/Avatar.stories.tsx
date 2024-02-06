import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StarIcon, BoltIcon, CloudIcon } from '@heroicons/react/24/solid';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Avatar, type IAvatarProps } from './Avatar';

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAvatarProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      colsProps={[
        {
          src: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {},
        { children: 'OP' },
        { children: <StarIcon aria-hidden /> },
        { src: '/broken-image.jpg', alt: 'Olivier' },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Image: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      colsProps={[
        {
          src: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
      colsProps={[{ children: 'J' }, { children: 'R' }, { children: 'OP' }]}
    />
  ),
  args: defaultArgs,
};

export const Icon: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Avatar}
      props={props}
      colsProps={[
        { children: <StarIcon aria-hidden /> },
        { children: <BoltIcon aria-hidden /> },
        { children: <CloudIcon aria-hidden /> },
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
      colsProps={[
        { src: '/broken-image.jpg', alt: 'John Doe' },
        { src: '/broken-image.jpg', alt: 'Richard Roe' },
        { src: '/broken-image.jpg' },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
