import type { IPlaygroundSections } from '~/docs/Playground';
import type { IAny } from '~/helpers/types';
import type { ITextFieldBasePlaygroundDemoProps } from './TextFieldBasePlaygroundDemo';
import {
  FieldBasePlaceholder,
  fieldBasePlaygroundSections,
} from '~/docs/FieldBasePlayground';
import { Playground } from '~/docs/Playground';
import { TextFieldBasePlaygroundDemo } from './TextFieldBasePlaygroundDemo';

export const textFieldBasePlaygroundSections: IPlaygroundSections<
  ITextFieldBasePlaygroundDemoProps<IAny>
> = {
  textFieldBase: {
    title: 'Text Field Base',
    options: [
      {
        label: 'Clearable',
        props: {
          clearable: true,
        },
      },
    ],
  },
  ...fieldBasePlaygroundSections,
};

export const TextFieldBasePlayground: React.FC = (props) => {
  return (
    <Playground<
      ITextFieldBasePlaygroundDemoProps<
        HTMLDivElement,
        React.ComponentPropsWithoutRef<'div'>
      >
    >
      {...props}
      defaultSections={textFieldBasePlaygroundSections}
      componentRenderer={(props) => <TextFieldBasePlaygroundDemo {...props} />}
      initialProps={{
        textFieldBase: {
          inputRenderer: () => <FieldBasePlaceholder />,
          populated: true,
        },
      }}
    />
  );
};
