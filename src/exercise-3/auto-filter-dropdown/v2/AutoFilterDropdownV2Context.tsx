import { createContext, use, type ActionDispatch } from 'react';
import type { WithId } from '../AutoFilterDropdownTypes';
import type {
  AutoFilterDropdownAction,
  AutoFilterDropdownState,
} from '../autoFilterDropdownReducer';

export type AutoFilterDropdownV2ContextType<T extends WithId> = {
  dispatch: ActionDispatch<[action: AutoFilterDropdownAction<T>]>;
  id: string;
  state: AutoFilterDropdownState<T>;
  valueChange: (value: T | null) => void;
};

export const AutoFilterDropdownV2Context =
  createContext<AutoFilterDropdownV2ContextType<WithId> | null>(null);

export function useAutoFilterDropdownV2Context() {
  const context = use(AutoFilterDropdownV2Context);

  if (!context) {
    throw new Error('AutoFilterDropdownContext must be defined');
  }

  return context;
}
