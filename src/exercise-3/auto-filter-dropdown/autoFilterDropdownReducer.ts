import type { KeyboardEvent } from 'react';
import type { WithId } from './AutoFilterDropdownTypes';

export interface AutoFilterDropdownState<T> {
  activeOption: T | null;
  areOptionsVisible: boolean;
  filter: string;
  filterProperty: keyof T;
  options: T[];
  selectedOption: T | null;
}

export type AutoFilterDropdownAction<T> =
  | {
      type: 'BLUR';
    }
  | {
      type: 'FILTER';
      payload: string;
    }
  | {
      type: 'FOCUS';
    }
  | {
      type: 'HOVER_OPTION';
      payload: T;
    }
  | {
      type: 'PRESS_KEY';
      payload: KeyboardEvent<HTMLInputElement>;
    }
  | {
      type: 'REGISTER_OPTION';
      payload: T;
    }
  | {
      type: 'SELECT_OPTION';
      payload: T;
    }
  | {
      type: 'UNREGISTER_OPTION';
      payload: T;
    };

export function autoFilterDropdownReducer<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  action: AutoFilterDropdownAction<T>,
): AutoFilterDropdownState<T> {
  switch (action.type) {
    case 'BLUR':
      return onBlur<T>(state);

    case 'FILTER':
      return onFilter<T>(state, action.payload);

    case 'FOCUS':
      return onFocus<T>(state);

    case 'HOVER_OPTION':
      return onHoverOption(state, action.payload);

    case 'PRESS_KEY':
      return onPressKey(state, action.payload);

    case 'REGISTER_OPTION':
      return onRegisterOption(state, action.payload);

    case 'SELECT_OPTION':
      return onSelectOption(state, action.payload);

    case 'UNREGISTER_OPTION':
      return onUnregisterOption(state, action.payload);

    default:
      return state;
  }
}

function getFilteredOptions<T extends WithId>({
  options,
  filterProperty,
  filter,
}: Pick<AutoFilterDropdownState<T>, 'options' | 'filterProperty' | 'filter'>) {
  return options.filter((option) =>
    String(option[filterProperty])
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase()),
  );
}

function getFirstFilteredOption<T extends WithId>({
  options,
  filterProperty,
  filter,
}: Pick<AutoFilterDropdownState<T>, 'options' | 'filterProperty' | 'filter'>) {
  const filteredOptions = getFilteredOptions({
    options,
    filterProperty,
    filter,
  });
  return filteredOptions[0] ?? null;
}

function getLastFilteredOption<T extends WithId>({
  options,
  filterProperty,
  filter,
}: Pick<AutoFilterDropdownState<T>, 'options' | 'filterProperty' | 'filter'>) {
  const filteredOptions = getFilteredOptions({
    options,
    filterProperty,
    filter,
  });
  return filteredOptions[filteredOptions.length - 1] ?? null;
}

function onBlur<T extends WithId>(
  state: AutoFilterDropdownState<T>,
): AutoFilterDropdownState<T> {
  return {
    ...state,
    activeOption: null,
    areOptionsVisible: false,
  };
}

function onFilter<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  filter: string,
): AutoFilterDropdownState<T> {
  return {
    ...state,
    areOptionsVisible: true,
    filter,
    selectedOption: null,
  };
}

function onFocus<T extends WithId>(
  state: AutoFilterDropdownState<T>,
): AutoFilterDropdownState<T> {
  return {
    ...state,
    areOptionsVisible: true,
  };
}

function onHoverOption<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  activeOption: T | null,
): AutoFilterDropdownState<T> {
  return { ...state, activeOption };
}

function onPressKey<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  event: KeyboardEvent<HTMLInputElement>,
): AutoFilterDropdownState<T> {
  switch (event.key) {
    case 'ArrowDown':
      return onArrowDown(state, event);

    case 'ArrowUp':
      return onArrowUp(state, event);

    case 'Enter':
      return onEnter(state, event);

    case 'Escape':
      return onEscape(state, event);

    default:
      return state;
  }
}

function onArrowDown<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  event: KeyboardEvent<HTMLInputElement>,
): AutoFilterDropdownState<T> {
  event.preventDefault();

  const { activeOption, options, filter, filterProperty } = state;

  const filteredOptions = getFilteredOptions({
    options,
    filter,
    filterProperty,
  });

  const firstFilteredOption = getFirstFilteredOption({
    options,
    filter,
    filterProperty,
  });

  if (filteredOptions.length === 0) {
    return {
      ...state,
      activeOption: null,
      areOptionsVisible: false,
    };
  }

  if (activeOption === null) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const currentIndex = filteredOptions.findIndex(
    (option) => option.id === activeOption.id,
  );

  if (currentIndex === -1) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const newIndex = currentIndex + 1;

  if (newIndex > filteredOptions.length - 1) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  return {
    ...state,
    activeOption: filteredOptions[newIndex],
    areOptionsVisible: true,
  };
}

function onArrowUp<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  event: KeyboardEvent<HTMLInputElement>,
): AutoFilterDropdownState<T> {
  event.preventDefault();

  const { activeOption, options, filter, filterProperty } = state;

  const filteredOptions = getFilteredOptions({
    options,
    filter,
    filterProperty,
  });

  const firstFilteredOption = getFirstFilteredOption({
    options,
    filter,
    filterProperty,
  });

  const lastFilteredOption = getLastFilteredOption({
    options,
    filter,
    filterProperty,
  });

  if (filteredOptions.length === 0) {
    return {
      ...state,
      activeOption: null,
      areOptionsVisible: false,
    };
  }

  if (activeOption === null) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const currentIndex = filteredOptions.findIndex(
    (option) => option.id === activeOption.id,
  );

  if (currentIndex === -1) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const newIndex = currentIndex - 1;

  if (newIndex < 0) {
    return {
      ...state,
      activeOption: lastFilteredOption,
      areOptionsVisible: true,
    };
  }

  return {
    ...state,
    activeOption: filteredOptions[newIndex],
    areOptionsVisible: true,
  };
}

function onEnter<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  event: KeyboardEvent<HTMLInputElement>,
): AutoFilterDropdownState<T> {
  event.preventDefault();

  const { activeOption, filterProperty } = state;

  if (activeOption) {
    return {
      ...state,
      areOptionsVisible: false,
      filter: String(activeOption[filterProperty]),
      selectedOption: activeOption,
    };
  }

  return state;
}

function onEscape<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  event: KeyboardEvent<HTMLInputElement>,
): AutoFilterDropdownState<T> {
  event.preventDefault();

  return { ...state, areOptionsVisible: false };
}

function onRegisterOption<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  optionToRegister: T,
): AutoFilterDropdownState<T> {
  const existingOption = state.options.find(
    (option) => option.id === optionToRegister.id,
  );

  if (existingOption) {
    return state;
  }

  return {
    ...state,
    options: [...state.options, optionToRegister],
  };
}

function onSelectOption<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  option: T,
): AutoFilterDropdownState<T> {
  return {
    ...state,
    activeOption: null,
    areOptionsVisible: false,
    filter: String(option[state.filterProperty]),
    selectedOption: option,
  };
}

function onUnregisterOption<T extends WithId>(
  state: AutoFilterDropdownState<T>,
  optionToUnregister: T,
): AutoFilterDropdownState<T> {
  const newOptions = state.options.filter(
    (option) => option.id !== optionToUnregister.id,
  );

  return {
    ...state,
    options: newOptions,
  };
}
