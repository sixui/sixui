import type { Meta, StoryObj } from '@storybook/react';
import { delay } from '@olivierpascal/helpers';

import type { IFileUploaderDemoProps } from './FileDropZoneControl.stories/FileUploaderDemo';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { FILES } from './FileDropZoneControl.stories/files';
import { FileUploaderDemo } from './FileDropZoneControl.stories/FileUploaderDemo';
import { getIconFromMimeType } from './FileDropZoneControl.stories/getIconFromMimeType';

interface ISimulateUploadFactoryProps {
  duration?: number;
  progressInterval?: number;
}

const defaultSimulateUploadFactoryProps = {
  duration: 1000,
  progressInterval: 100,
};

const simulateUploadFactory =
  (
    userFactoryProps?: ISimulateUploadFactoryProps,
  ): IFileUploaderDemoProps['upload'] =>
  (_file, _uploadUrl, progressEvent) => {
    const factoryProps = {
      ...defaultSimulateUploadFactoryProps,
      ...userFactoryProps,
    };

    // Simulate file upload.
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += factoryProps.progressInterval / factoryProps.duration;
        progressEvent({ progress });

        if (progress >= 1) {
          clearInterval(interval);
          resolve();
        }
      }, factoryProps.progressInterval);
    });
  };

const simulateGenerateUploadUrl: IFileUploaderDemoProps['generateUploadUrl'] =
  async (): Promise<string> => {
    // Simulate upload URL generation.
    await delay(1000);

    return 'https://example.com';
  };

const simulateRegister: IFileUploaderDemoProps['register'] = async (file) => {
  // Simulate file registration.
  await delay(1000);

  return {
    ...file,
    id: `registered--${file.internalId}`,
  };
};

const meta = {
  component: FileUploaderDemo,
  args: {
    w: '480px',
    acceptedFileTypes: {
      'image/*': [],
    },
    getIconFromMimeType,
    generateUploadUrl: simulateGenerateUploadUrl,
    upload: simulateUploadFactory(),
    register: simulateRegister,
    initializeFile: (file) =>
      file.id ? delay(1500).then(() => FILES[file.id!]!) : undefined,
    onSuccess: (...args) => void sbHandleEvent('onSuccess', args),
    onError: (...args) => void sbHandleEvent('onError', args),
    onDelete: (...args) => void sbHandleEvent('onDelete', args),
    onReorder: (...args) => void sbHandleEvent('onReorder', args),
    onChange: (...args) => void sbHandleEvent('onChange', args),
    onProcessing: (...args) => void sbHandleEvent('onProcessing', args),
    allowRetryOnError: true,
    sortable: true,
  },
} satisfies Meta<typeof FileUploaderDemo>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
};

export const DefaultValue: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    defaultValue: [
      {
        id: Object.keys(FILES)[0]!,
      },
    ],
  },
};

export const LongUpload: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    upload: simulateUploadFactory({
      duration: 60000,
    }),
  },
};

export const ErrorOnUploadUrlGeneration: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    generateUploadUrl: async (file) => {
      await simulateGenerateUploadUrl(file);
      throw new Error('Failed to generate upload URL');
    },
  },
};

export const ErrorOnUpload: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    upload: async (file, uploadUrl, progressEvent) => {
      await simulateUploadFactory()(file, uploadUrl, progressEvent);
      throw new Error('Failed to upload file');
    },
  },
};

export const ErrorOnRegister: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    register: async (file) => {
      await simulateRegister(file);
      throw new Error('Failed to register file');
    },
  },
};

export default meta;
