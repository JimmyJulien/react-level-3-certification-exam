import { type ComponentProps, useEffect } from 'react';
import { useAutoFilterDropdownContext } from './AutoFilterDropdownContext';
import type { WithId } from './AutoFilterDropdownTypes';

export type AutoFilterDropdownOptionProps<T extends WithId> =
  ComponentProps<'li'> & { option: T };

export function AutoFilterDropdownOption<T extends WithId>({
  children,
  option,
  style,
  ...otherProps
}: AutoFilterDropdownOptionProps<T>) {
  const { activeOption, filter, filterProperty, dispatch } =
    useAutoFilterDropdownContext();

  useEffect(() => {
    dispatch({ type: 'REGISTER_OPTION', payload: option });
    return () => dispatch({ type: 'UNREGISTER_OPTION', payload: option });
  }, []);

  function onMouseEnter() {
    dispatch({ type: 'HOVER_OPTION', payload: option });
  }

  function onClick() {
    dispatch({ type: 'SELECT_OPTION', payload: option });
  }

  const optionText = String(option[filterProperty]);

  // Exercise 3 - spec 2
  const optionContainsFilter = optionText
    .toLocaleLowerCase()
    .includes(filter.toLocaleLowerCase());

  if (!optionContainsFilter) {
    return null;
  }

  // Exercise 3 - spec 1
  return (
    <li
      {...otherProps}
      aria-selected={activeOption?.id === option.id}
      id={`option-${option.id}`}
      onMouseDown={onClick}
      onMouseEnter={onMouseEnter}
      role="option"
      style={{
        backgroundColor: `${
          activeOption?.id === option.id ? 'lightgrey' : 'white'
        }`,
        cursor: 'pointer',
        overflow: 'hidden',
        padding: '0.5rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </li>
  );
}
