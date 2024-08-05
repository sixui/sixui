import { createContext, useContext } from 'react';

export type ICreateOptionalContextResult<TContextValue> = [
  ({
    children,
    value,
  }: {
    value: TContextValue;
    children: React.ReactNode;
  }) => JSX.Element,
  () => TContextValue | null,
];

export const createOptionalContext = <TContextValue,>(
  initialValue: TContextValue | null = null,
): ICreateOptionalContextResult<TContextValue> => {
  const Context = createContext<TContextValue | null>(initialValue);

  const useOptionalContext = (): TContextValue | null => useContext(Context);

  const Provider = ({
    children,
    value,
  }: {
    value: TContextValue;
    children: React.ReactNode;
  }): JSX.Element => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useOptionalContext] as const;
};
