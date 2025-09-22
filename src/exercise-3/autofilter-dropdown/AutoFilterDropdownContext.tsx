import { createContext, use, type ActionDispatch } from 'react';
import type { WithId } from './AutoFilterDropdownTypes';
import type { AutoFilterDropdownAction } from './autoFilterDropdownReducer';

export type AutoFilterDropdownContextType<T extends WithId> = {
  activeOption: T | null;
  areOptionsVisible: boolean;
  dispatch: ActionDispatch<[action: AutoFilterDropdownAction<T>]>;
  filter: string;
  filterProperty: keyof T;
  id: string;
  options: T[];
  selectedOption: T | null;
  valueChange: (value: T | null) => void;
};

export const AutoFilterDropdownContext =
  createContext<AutoFilterDropdownContextType<WithId> | null>(null);

export function useAutoFilterDropdownContext() {
  const context = use(AutoFilterDropdownContext);

  if (!context) {
    throw new Error('AutoFilterDropdownContext must be defined');
  }

  return context;
}
