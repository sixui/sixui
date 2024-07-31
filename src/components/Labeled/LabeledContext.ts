import { createContext } from 'react';

export type ILabeledContextValue = {
  id?: string;
  required?: boolean;
  disabled?: boolean;
  softDisabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  errorText?: React.ReactNode;
  loading?: boolean;
};

export const LabeledContext = createContext<ILabeledContextValue | undefined>(
  undefined,
);
