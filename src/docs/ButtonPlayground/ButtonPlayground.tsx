import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import type { IPlaygroundSections } from '~/docs/Playground';
import { Button, type IButtonOwnProps } from '~/components/Button';
import { Playground } from '~/docs/Playground';

type IButtonPlaygroundDemoProps = {
  button: IButtonOwnProps;
};

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
        },
        {
          label: 'Icon in trailing position',
          props: {
            trailingIcon: true,
          },
          getModifiers: (props) => ({
            disabled: !props?.button.icon,
          }),
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
            disabled: !props?.button.loading,
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
      componentRenderer={(props) => <Button {...props.button} />}
    />
  );
};
