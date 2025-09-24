import { type ComponentProps, useEffect } from 'react';
import type { WithId } from '../AutoFilterDropdownTypes';
import { useAutoFilterDropdownV2Context } from './AutoFilterDropdownV2Context';

export type AutoFilterDropdownV2OptionProps<T extends WithId> =
  ComponentProps<'li'> & { option: T };

export function AutoFilterDropdownV2Option<T extends WithId>({
  children,
  option,
  style,
  ...otherProps
}: AutoFilterDropdownV2OptionProps<T>) {
  const {
    state: { activeOption, filter, filterProperty },
    dispatch,
  } = useAutoFilterDropdownV2Context();

  useEffect(() => {
    dispatch({ type: 'REGISTER_OPTION', payload: option });
    return () => dispatch({ type: 'UNREGISTER_OPTION', payload: option });
  }, []);

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
      onMouseDown={() => dispatch({ type: 'SELECT_OPTION', payload: option })}
      onMouseEnter={() => dispatch({ type: 'HOVER_OPTION', payload: option })}
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
