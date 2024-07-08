import { createContext } from 'react';

export type IExpandableContextValue = {
  //
};

// const stub = (): never => {
//   throw new Error(
//     'You forgot to wrap your component in <ExpandableContext.Provider />.',
//   );
// };

export const disclosureInitialContext: IExpandableContextValue = {
  //
};

export const ExpandableContext = createContext<IExpandableContextValue>(
  disclosureInitialContext,
);
