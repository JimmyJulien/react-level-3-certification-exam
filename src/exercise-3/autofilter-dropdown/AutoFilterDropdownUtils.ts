import type { WithId } from './AutoFilterDropdownTypes';

export function getFilteredOptions<T extends WithId>({
  options,
  filterProperty,
  filter,
}: {
  options: T[];
  filterProperty: keyof T;
  filter: string;
}) {
  return options.filter((option) =>
    String(option[filterProperty])
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase()),
  );
}

export function getFirstFilteredOption<T extends WithId>({
  options,
  filterProperty,
  filter,
}: {
  options: T[];
  filterProperty: keyof T;
  filter: string;
}) {
  const filteredOptions = getFilteredOptions({
    options,
    filterProperty,
    filter,
  });
  return filteredOptions[0] ?? null;
}

export function getLastFilteredOption<T extends WithId>({
  options,
  filterProperty,
  filter,
}: {
  options: T[];
  filterProperty: keyof T;
  filter: string;
}) {
  const filteredOptions = getFilteredOptions({
    options,
    filterProperty,
    filter,
  });
  return filteredOptions[filteredOptions.length - 1] ?? null;
}
