import type { IButtonPlaygroundProps } from './ButtonPlayground.types';
import { Button, type IButtonOwnProps } from '@/components/Button';
import { Playground } from './Playground';
import { IPlaygroundOptions } from './Playground.types';

const options: IPlaygroundOptions<IButtonOwnProps> = {
  children: {
    label: 'Text',
    supportingText: 'The text to display on the button',
    type: 'string',
    defaultValue: 'xxx',
    modifiers: {
      toggleable: true,
      required: true,
      // disabled: true,
    },
  },
  icon: {
    label: 'Icon',
    type: 'boolean',
    defaultValue: true,
  },
};

export const ButtonPlayground: React.FC<IButtonPlaygroundProps> = (props) => {
  return (
    <Playground<IButtonOwnProps>
      {...props}
      options={options}
      componentRenderer={(componentProps) => {
        console.log(JSON.stringify(componentProps, null, 2));

        return <Button {...componentProps} />;
      }}
    />
  );
};
