import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  AssistChipPlaygroundDemo,
  type IAssistChipPlaygroundDemoProps,
} from './AssistChipPlaygroundDemo';

const IMAGE_URL = 'https://avatars.githubusercontent.com/u/2182039?v=4&s=48';

export const chipPlaygroundSections: IPlaygroundSections<IAssistChipPlaygroundDemoProps> =
  {
    assistChip: {
      title: 'Assist Chip',
      props: {
        onClick: () => {},
      },
      options: [
        {
          label: 'Label',
          input: {
            type: 'string',
            value: 'Add to calendar',
            targetProp: 'label',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Icon',
          props: {
            icon: <FontAwesomeIcon icon={faCalendarPlus} />,
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
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.assistChip.imageUrl,
          }),
        },
        {
          label: 'Elevated',
          props: {
            elevated: true,
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
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.assistChip.loading,
          }),
        },
      ],
    },
  };

export const AssistChipPlayground: React.FC = (props) => {
  return (
    <Playground<IAssistChipPlaygroundDemoProps>
      {...props}
      defaultSections={chipPlaygroundSections}
      componentRenderer={(props) => <AssistChipPlaygroundDemo {...props} />}
    />
  );
};
