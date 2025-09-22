import type { KeyboardEvent } from 'react';
import type { WithId } from './AutoFilterDropdownTypes';
import {
  getFilteredOptions,
  getFirstFilteredOption,
  getLastFilteredOption,
} from './AutoFilterDropdownUtils';

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
      return {
        ...state,
        activeOption: null,
        areOptionsVisible: false,
      };
    case 'FILTER':
      return {
        ...state,
        filter: action.payload,
        selectedOption: null,
      };

    case 'FOCUS':
      return {
        ...state,
        areOptionsVisible: true,
        activeOption: getFirstFilteredOption({
          filter: state.filter,
          filterProperty: state.filterProperty,
          options: state.options,
        }),
      };

    case 'HOVER_OPTION':
      return { ...state, activeOption: action.payload };

    case 'PRESS_KEY':
      return onPressKey(state, action.payload);

    case 'REGISTER_OPTION':
      return onRegisterOption(state, action.payload);

    case 'SELECT_OPTION':
      return {
        ...state,
        activeOption: action.payload,
        areOptionsVisible: false,
        filter: String(action.payload[state.filterProperty]),
        selectedOption: action.payload,
      };

    case 'UNREGISTER_OPTION':
      return onUnregisterOption(state, action.payload);

    default:
      return state;
  }
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
      areOptionsVisible: true,
    };
  }

  if (activeOption === null) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const actualIndex = filteredOptions.findIndex(
    (option) => option.id === activeOption?.id,
  );

  if (actualIndex === -1) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const newIndex = actualIndex + 1;

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
      areOptionsVisible: true,
    };
  }

  if (activeOption === null) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const actualIndex = filteredOptions.findIndex(
    (option) => option.id === activeOption.id,
  );

  if (actualIndex === -1) {
    return {
      ...state,
      activeOption: firstFilteredOption,
      areOptionsVisible: true,
    };
  }

  const newIndex = actualIndex - 1;

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
