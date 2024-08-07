import { createContext, useContext } from 'react';

export type ICreateSafeContextResult<TContextValue> = [
  ({
    children,
    value,
  }: {
    value: TContextValue;
    children: React.ReactNode;
  }) => JSX.Element,
  () => TContextValue,
];

export const createSafeContext = <TContextValue,>(
  errorMessage: string,
): ICreateSafeContextResult<TContextValue> => {
  const Context = createContext<TContextValue | null>(null);

  const useSafeContext = (): TContextValue => {
    const context = useContext(Context);

    if (context === null) {
      throw new Error(errorMessage);
    }

    return context;
  };

  const Provider = ({
    children,
    value,
  }: {
    value: TContextValue;
    children: React.ReactNode;
  }): JSX.Element => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useSafeContext] as const;
};
