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
            disabled: !sectionProps?.assistChip.imageUrl,
          }),
        },
        {
          label: 'Elevated',
          props: {
            elevated: true,
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
