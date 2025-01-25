import { useId as reactUseId } from 'react';

export const useId = (idOverride?: string): string => {
  const reactId = reactUseId();

  return idOverride ?? reactId;
};
