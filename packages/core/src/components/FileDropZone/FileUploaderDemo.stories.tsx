import type { Meta, StoryObj } from '@storybook/react';
import { delay } from '@olivierpascal/helpers';

import type { IFileUploaderDemoProps } from './FileDropZone.stories/FileUploaderDemo';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { FileUploaderDemo } from './FileDropZone.stories/FileUploaderDemo';
import { getIconFromMimeType } from './FileDropZone.stories/getIconFromMimeType';

const meta = {
  component: FileUploaderDemo,
} satisfies Meta<typeof FileUploaderDemo>;

type IStory = StoryObj<typeof meta>;

const simulateGenerateUploadUrl: IFileUploaderDemoProps['generateUploadUrl'] =
  async (): Promise<string> => {
    // Simulate upload URL generation.
    await delay(1000);

    return 'https://example.com';
  };

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

const simulateRegister: IFileUploaderDemoProps['register'] = async () => {
  // Simulate file registration.
  await delay(1000);
};

const defaultArgs = {
  w: '480px',
  acceptedFileTypes: {
    'image/*': [],
  },
  getIconFromMimeType,
  generateUploadUrl: simulateGenerateUploadUrl,
  upload: simulateUploadFactory(),
  register: simulateRegister,
  onSuccess: (...args) => void sbHandleEvent('onSuccess', args),
  onError: (...args) => void sbHandleEvent('onError', args),
  onDelete: (...args) => void sbHandleEvent('onDelete', args),
  allowRetryOnError: true,
  sortable: true,
} satisfies Partial<IFileUploaderDemoProps>;

export const Success: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: defaultArgs,
};

export const LongUpload: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    ...defaultArgs,
    upload: simulateUploadFactory({
      duration: 60000,
    }),
  },
};

export const ErrorOnUploadUrlGeneration: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    ...defaultArgs,
    generateUploadUrl: async (file) => {
      await simulateGenerateUploadUrl(file);
      throw new Error('Failed to generate upload URL');
    },
  },
};

export const ErrorOnUpload: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    ...defaultArgs,
    upload: async (file, uploadUrl, progressEvent) => {
      await simulateUploadFactory()(file, uploadUrl, progressEvent);
      throw new Error('Failed to upload file');
    },
  },
};

export const ErrorOnRegister: IStory = {
  render: (props) => <FileUploaderDemo {...props} />,
  args: {
    ...defaultArgs,
    register: async (file) => {
      await simulateRegister(file);
      throw new Error('Failed to register file');
    },
  },
};

export default meta;
