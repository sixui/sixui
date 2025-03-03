import type { Meta, StoryObj } from '@storybook/react';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IDropZoneProps } from './DropZone.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { DropZone } from './DropZone';

const meta = {
  component: DropZone,
} satisfies Meta<typeof DropZone>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '384px',
  icon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
  label: 'Drop here',
} satisfies Partial<IDropZoneProps>;

const DropZoneShowcase = componentShowcaseFactory(DropZone);

export const Empty: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: defaultArgs,
};

export const Actionable: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Drop here or click here',
    onClick: (...args) => sbHandleEvent('onClick', args),
  },
};

export const Dropping: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Dropping here...',
    dropping: true,
  },
};

export const Disabled: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: "Don't drop here",
    disabled: true,
  },
};

export default meta;
