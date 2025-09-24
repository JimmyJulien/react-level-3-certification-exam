import {
  useEffect,
  useReducer,
  type ComponentProps,
  type ReactNode,
} from 'react';
import type { WithId } from '../AutoFilterDropdownTypes';
import { autoFilterDropdownReducer } from '../autoFilterDropdownReducer';
import {
  AutoFilterDropdownV2Context,
  type AutoFilterDropdownV2ContextType,
} from './AutoFilterDropdownV2Context';

export type AutoFilterDropdownV2Props<T extends WithId> =
  ComponentProps<'div'> & {
    children: ReactNode;
    id: string;
    filterProperty: keyof T;
    valueChange: (value: T | null) => void;
  };

// Exercise 3 - version 1 : flexible but not concise
export function AutoFilterDropdownV2<T extends WithId>({
  children,
  filterProperty,
  id,
  style,
  valueChange,
  ...otherProps
}: AutoFilterDropdownV2Props<T>) {
  const [state, dispatch] = useReducer(autoFilterDropdownReducer, {
    activeOption: null,
    areOptionsVisible: false,
    filter: '',
    filterProperty, // Exercise 3 - spec 3
    options: [],
    selectedOption: null,
  });

  const { selectedOption } = state;

  const contextValue: AutoFilterDropdownV2ContextType<T> = {
    dispatch,
    id,
    state,
    valueChange,
  };

  useEffect(() => {
    valueChange(selectedOption); // Exercise 3 - spec 5
  }, [selectedOption]);

  // Exercise 3 - spec 6
  // NOTE: as never to avoid complex TS boilerplate and any
  // (better solution to discuss)
  return (
    <AutoFilterDropdownV2Context value={contextValue as never}>
      <div
        style={{ position: 'relative', width: '100%', ...style }}
        onBlur={() => dispatch({ type: 'BLUR' })}
        {...otherProps}
      >
        {children}
      </div>
    </AutoFilterDropdownV2Context>
  );
}
