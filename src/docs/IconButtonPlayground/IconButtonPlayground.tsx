import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  IconButtonPlaygroundDemo,
  type IIconButtonPlaygroundDemoProps,
} from './IconButtonPlaygroundDemo';

export const iconbuttonPlaygroundSections: IPlaygroundSections<IIconButtonPlaygroundDemoProps> =
  {
    iconButton: {
      title: 'IconButton',
      props: {
        icon: <FontAwesomeIcon icon={faHeart} />,
        selectedIcon: <FontAwesomeIcon icon={faHeartSolid} />,
      },
      options: [
        {
          label: 'Variant',
          input: {
            type: 'string',
            value: 'filled',
            items: [
              { label: 'Filled', value: 'filled' },
              { label: 'Filled Tonal', value: 'filledTonal' },
              { label: 'Outlined', value: 'outlined' },
              { label: 'Danger', value: 'danger' },
              { label: 'Standard', value: 'standard' },
            ],
            targetProp: 'variant',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Togglable',
          props: {
            toggle: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Toggled',
          props: {
            selected: true,
          },
          modifiers: {
            off: true,
          },
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.iconButton.toggle,
          }),
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
      ],
    },
  };

export const IconButtonPlayground: React.FC = (props) => {
  return (
    <Playground<IIconButtonPlaygroundDemoProps>
      {...props}
      defaultSections={iconbuttonPlaygroundSections}
      componentRenderer={(props) => <IconButtonPlaygroundDemo {...props} />}
    />
  );
};
