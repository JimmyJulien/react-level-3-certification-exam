import DOMPurify from 'dompurify';
import { useEffect, useReducer } from 'react';
import type { WithId } from '../AutoFilterDropdownTypes';
import { autoFilterDropdownReducer } from '../autoFilterDropdownReducer';

export type AutoFilterDropdownV1Props<T extends WithId> = {
  disabled?: boolean;
  filterProperty: keyof T;
  id: string;
  options: T[];
  valueChange: (value: T | null) => void;
};

// Exercise 3 - version 1 : concise but not flexible
export function AutoFilterDropdownV1<T extends WithId>({
  disabled = false,
  filterProperty,
  id,
  options: initialOptions,
  valueChange,
}: AutoFilterDropdownV1Props<T>) {
  const [state, dispatch] = useReducer(autoFilterDropdownReducer, {
    activeOption: null,
    areOptionsVisible: false,
    filter: '',
    filterProperty, // Exercise 3 - spec 3
    options: initialOptions,
    selectedOption: null,
  });

  const { activeOption, areOptionsVisible, filter, options, selectedOption } =
    state;

  const filteredOptions: T[] = options.filter((option) =>
    String(option[filterProperty])
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase()),
  );

  function formattedText(text: string): string {
    const purifiedText = DOMPurify.sanitize(text);

    const regex = new RegExp(`(${filter})`, 'gi');

    // Exercise 3 - spec 4
    return filter ? purifiedText.replace(regex, '<b>$1</b>') : purifiedText;
  }

  useEffect(() => {
    valueChange(selectedOption);
  }, [selectedOption]);

  return (
    <div
      style={{ position: 'relative', width: '100%' }}
      onBlur={() => dispatch({ type: 'BLUR' })}
    >
      <input
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
        }}
        type="text"
        value={filter}
      />
      {areOptionsVisible && (
        <ul
          id={`auto-filter-dropdown-list-${id}`}
          role="listbox"
          style={{
            border: '1px solid',
            borderTop: 'none',
            boxSizing: 'border-box',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            overflow: 'auto',
            width: '100%',
            zIndex: 1000,
          }}
        >
          {filteredOptions.map((option) => (
            <li
              aria-selected={activeOption?.id === option.id}
              id={`option-${option.id}`}
              key={option.id}
              onMouseDown={() =>
                dispatch({ type: 'SELECT_OPTION', payload: option })
              }
              onMouseEnter={() =>
                dispatch({ type: 'HOVER_OPTION', payload: option })
              }
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
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: formattedText(String(option[filterProperty])),
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
