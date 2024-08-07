import { createContext } from 'react';

export type ILabeledContextValue = {
  id?: string;
  required?: boolean;
  disabled?: boolean;

  /**
   * If `true`, the component will be rendered in a disabled state, but will
   * still be focusable.
   */
  readOnly?: boolean;

  hasError?: boolean;
  errorText?: React.ReactNode;
  loading?: boolean;
};

export const LabeledContext = createContext<ILabeledContextValue | undefined>(
  undefined,
);
