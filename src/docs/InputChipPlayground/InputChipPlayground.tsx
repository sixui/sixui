import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  InputChipPlaygroundDemo,
  type IInputChipPlaygroundDemoProps,
} from './InputChipPlaygroundDemo';

const IMAGE_URL = 'https://avatars.githubusercontent.com/u/2182039?v=4&s=48';

export const chipPlaygroundSections: IPlaygroundSections<IInputChipPlaygroundDemoProps> =
  {
    inputChip: {
      title: 'Input Chip',
      props: {
        onClick: () => {},
      },
      options: [
        {
          label: 'Label',
          input: {
            type: 'string',
            value: 'Olivier Pascal',
            targetProp: 'label',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Icon',
          props: {
            icon: <FontAwesomeIcon icon={faUser} />,
          },
        },
        {
          label: 'Image',
          input: {
            type: 'string',
            targetProp: 'imageUrl',
            value: IMAGE_URL,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Avatar',
          props: {
            avatar: true,
          },
          modifiers: {
            off: true,
          },
          getModifiers: (props) => ({
            disabled: !props?.inputChip.imageUrl,
          }),
        },
        {
          label: 'Deletable',
          props: {
            onDelete: () => {},
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Selected',
          props: {
            selected: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Disabled',
          props: {
            disabled: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Loading',
          props: {
            loading: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Loading text',
          input: {
            type: 'string',
            value: 'Wait...',
            targetProp: 'loadingText',
          },
          modifiers: {
            off: true,
          },
          getModifiers: (props) => ({
            disabled: !props?.inputChip.loading,
          }),
        },
      ],
    },
  };

export const InputChipPlayground: React.FC = (props) => {
  return (
    <Playground<IInputChipPlaygroundDemoProps>
      {...props}
      defaultSections={chipPlaygroundSections}
      componentRenderer={(props) => <InputChipPlaygroundDemo {...props} />}
    />
  );
};
