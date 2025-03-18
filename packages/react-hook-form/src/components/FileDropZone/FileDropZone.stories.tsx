import type { Meta, StoryObj } from '@storybook/react';
import { IFileDropZoneFileState, MIME_TYPES } from '@sixui/core';
import { action } from '@storybook/addon-actions';

import { FileDropZone } from './FileDropZone';

const FIELD_NAME = 'fieldName';

const meta = {
  component: FileDropZone,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(...args);
    },
    label: 'Label',
  },
} satisfies Meta<typeof FileDropZone>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {};

export const Required: IStory = {
  args: {
    required: true,
  },
};

export const WithDefaultValue: IStory = {
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: [
          {
            state: IFileDropZoneFileState.Initialized,
            thumbUrl:
              'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=200',
            name: 'File.png',
            mimeType: MIME_TYPES.png,
            size: 133421,
          },
        ],
      },
    },
  },
};

export default meta;
