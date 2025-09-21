import type { ChangeEvent, ComponentProps, KeyboardEvent } from 'react';
import { useAutoFilterDropdownContext } from './AutoFilterDropdownContext';

export type AutoFilterDropdownInputProps = Omit<
  ComponentProps<'input'>,
  'children'
>;

export function AutoFilterDropdownInput({
  disabled,
  style,
  ...otherProps
}: AutoFilterDropdownInputProps) {
  const { activeOption, areOptionsVisible, filter, id, dispatch } =
    useAutoFilterDropdownContext();

  function onFocus() {
    dispatch({ type: 'FOCUS' });
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'FILTER', payload: event.target.value });
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    dispatch({ type: 'PRESS_KEY', payload: event });
  }

  return (
    <input
      {...otherProps}
      aria-activedescendant={
        activeOption ? `option-${activeOption.id}` : undefined
      }
      aria-autocomplete="list"
      aria-controls={`autofilter-dropdown-listbox-${id}`}
      aria-expanded={areOptionsVisible}
      aria-haspopup="listbox"
      id={id}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="combobox"
      style={{
        boxSizing: 'border-box',
        cursor: `${disabled ? 'not-allowed' : 'default'}`,
        padding: '0.5rem',
        width: '100%',
        ...style,
      }}
      type="text"
      value={filter}
    />
  );
}
