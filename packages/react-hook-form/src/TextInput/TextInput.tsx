// import type { ITextInputProps as $TextInputProps } from '@sixui/core';
// import type { FieldValues, UseControllerProps } from 'react-hook-form';
// import { TextInput as $TextInput } from '@sixui/core';
// import { useController } from 'react-hook-form';

// export type ITextInputProps<T extends FieldValues> = UseControllerProps<T> &
//   Omit<$TextInputProps, 'value' | 'defaultValue'>;

// export const TextInput = <T extends FieldValues>({
//   name,
//   control,
//   defaultValue,
//   rules,
//   shouldUnregister,
//   onChange,
//   ...props
// }: ITextInputProps<T>) => {
//   const {
//     field: { value, onChange: fieldOnChange, ...field },
//     fieldState,
//   } = useController<T>({
//     name,
//     control,
//     defaultValue,
//     rules,
//     shouldUnregister,
//   });

//   return (
//     <$TextInput
//       value={value}
//       onChange={(e) => {
//         fieldOnChange(e);
//         onChange?.(e);
//       }}
//       error={fieldState.error?.message}
//       {...field}
//       {...props}
//     />
//   );
// };
