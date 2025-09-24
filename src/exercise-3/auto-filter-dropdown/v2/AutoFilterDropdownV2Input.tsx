import type { ComponentProps } from 'react';
import { useAutoFilterDropdownV2Context } from './AutoFilterDropdownV2Context';

export type AutoFilterDropdownV2InputProps = Omit<
  ComponentProps<'input'>,
  'children'
>;

export function AutoFilterDropdownV2Input({
  disabled,
  style,
  ...otherProps
}: AutoFilterDropdownV2InputProps) {
  const {
    state: { activeOption, areOptionsVisible, filter },
    id,
    dispatch,
  } = useAutoFilterDropdownV2Context();

  return (
    <input
      {...otherProps}
      aria-activedescendant={
        activeOption ? `option-${activeOption.id}` : undefined
      }
      aria-autocomplete="list"
      aria-controls={`auto-filter-dropdown-listbox-${id}`}
      aria-expanded={areOptionsVisible}
      aria-haspopup="listbox"
      id={id}
      onChange={(event) =>
        dispatch({ type: 'FILTER', payload: event.target.value })
      }
      onFocus={() => dispatch({ type: 'FOCUS' })}
      onKeyDown={(event) => dispatch({ type: 'PRESS_KEY', payload: event })}
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
