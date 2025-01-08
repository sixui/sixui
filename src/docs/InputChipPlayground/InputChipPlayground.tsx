import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IPlaygroundSections } from '~/docs/Playground';
import type { IInputChipPlaygroundDemoProps } from './InputChipPlaygroundDemo';
import { Playground } from '~/docs/Playground';
import { InputChipPlaygroundDemo } from './InputChipPlaygroundDemo';

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
          modifiers: {
            on: true,
          },
        },
        {
          label: 'Image',
          input: {
            type: 'string',
            targetProp: 'imageUrl',
            value: IMAGE_URL,
          },
        },
        {
          label: 'Avatar',
          props: {
            avatar: true,
          },
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.inputChip.imageUrl,
          }),
        },
        {
          label: 'Deletable',
          props: {
            onTrailingClick: () => {},
          },
        },
        {
          label: 'Selected',
          props: {
            selected: true,
          },
        },
        {
          label: 'Disabled',
          props: {
            disabled: true,
          },
        },
        {
          label: 'Loading',
          props: {
            loading: true,
          },
        },
        {
          label: 'Loading text',
          input: {
            type: 'string',
            value: 'Wait...',
            targetProp: 'loadingText',
          },
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.inputChip.loading,
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
