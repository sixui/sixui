import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IPlaygroundSections } from '~/docs/Playground';
import type { IButtonPlaygroundDemoProps } from './ButtonPlaygroundDemo';
import { Playground } from '~/docs/Playground';
import { ButtonPlaygroundDemo } from './ButtonPlaygroundDemo';

export const buttonPlaygroundSections: IPlaygroundSections<IButtonPlaygroundDemoProps> =
  {
    button: {
      title: 'Button',
      options: [
        {
          label: 'Variant',
          input: {
            type: 'string',
            value: 'filled',
            items: [
              { label: 'Filled', value: 'filled' },
              { label: 'Filled Tonal', value: 'filledTonal' },
              { label: 'Elevated', value: 'elevated' },
              { label: 'Outlined', value: 'outlined' },
              { label: 'Danger', value: 'danger' },
              { label: 'Text', value: 'text' },
            ],
            targetProp: 'variant',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Text',
          input: {
            type: 'string',
            value: 'Send',
            targetProp: 'children',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Icon',
          props: {
            icon: <FontAwesomeIcon icon={faPaperPlane} />,
          },
          modifiers: {
            on: true,
          },
        },
        {
          label: 'Icon in trailing position',
          props: {
            trailingIcon: true,
          },
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.button.icon,
          }),
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
            disabled: !sectionProps?.button.loading,
          }),
        },
      ],
    },
  };

export const ButtonPlayground: React.FC = (props) => {
  return (
    <Playground<IButtonPlaygroundDemoProps>
      {...props}
      defaultSections={buttonPlaygroundSections}
      componentRenderer={(props) => <ButtonPlaygroundDemo {...props} />}
    />
  );
};
