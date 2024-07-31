import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import type { IPlaygroundSections } from './Playground.types';
import { Button, type IButtonOwnProps } from '~/components/Button';
import { Playground } from './Playground';

const defaultSections: IPlaygroundSections<IButtonOwnProps> = [
  {
    title: 'Props',
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
          disabled: !props?.icon,
        }),
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
          disabled: !props?.loading,
        }),
      },
    ],
  },
];

export const ButtonPlayground: React.FC = (props) => {
  return (
    <Playground<IButtonOwnProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => <Button {...componentProps} />}
    />
  );
};
