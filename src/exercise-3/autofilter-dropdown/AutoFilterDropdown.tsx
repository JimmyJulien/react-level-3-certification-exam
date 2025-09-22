import {
  useEffect,
  useReducer,
  type ComponentProps,
  type ReactNode,
} from 'react';
import {
  AutoFilterDropdownContext,
  type AutoFilterDropdownContextType,
} from './AutoFilterDropdownContext';
import type { WithId } from './AutoFilterDropdownTypes';
import { autoFilterDropdownReducer } from './autoFilterDropdownReducer2';

export type AutoFilterDropdownProps<T extends WithId> =
  ComponentProps<'div'> & {
    children: ReactNode;
    id: string;
    filterProperty: keyof T;
    valueChange: (value: T | null) => void;
  };

// Exercise 3 - spec 6
export function AutoFilterDropdown<T extends WithId>({
  children,
  filterProperty,
  id,
  style,
  valueChange,
  ...otherProps
}: AutoFilterDropdownProps<T>) {
  const [state, dispatch] = useReducer(autoFilterDropdownReducer, {
    activeOption: null,
    areOptionsVisible: false,
    filter: '',
    filterProperty,
    options: [],
    selectedOption: null,
  });

  const { options, activeOption, filter, areOptionsVisible, selectedOption } =
    state;

  function onBlur() {
    dispatch({ type: 'BLUR' });
  }

  const contextValue: AutoFilterDropdownContextType<T> = {
    activeOption,
    areOptionsVisible,
    filter,
    filterProperty, // Exercise 3 - spec 3
    id,
    options,
    dispatch,
    selectedOption,
    valueChange,
  };

  useEffect(() => {
    valueChange(selectedOption); // Exercise 3 -spec 5
  }, [selectedOption]);

  // NOTE: as never to avoid complex TS boilerplate and any
  // (better solution to discuss)
  return (
    <AutoFilterDropdownContext value={contextValue as never}>
      <div
        style={{ position: 'relative', width: '100%', ...style }}
        onBlur={onBlur}
        {...otherProps}
      >
        {children}
      </div>
    </AutoFilterDropdownContext>
  );
}
