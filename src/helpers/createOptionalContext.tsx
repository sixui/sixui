import { createContext, useContext } from 'react';

export type ICreateOptionalContextResult<TContextValue> = [
  ({
    children,
    value,
  }: {
    value: TContextValue;
    children: React.ReactNode;
  }) => JSX.Element,
  () => TContextValue | undefined,
];

export const createOptionalContext = <TContextValue,>(
  initialValue: TContextValue | undefined = undefined,
): ICreateOptionalContextResult<TContextValue> => {
  const Context = createContext<TContextValue | undefined>(initialValue);

  const useOptionalContext = (): TContextValue | undefined =>
    useContext(Context);

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
