import type { ComponentProps, ReactNode } from 'react';
import { useAutoFilterDropdownV2Context } from './AutoFilterDropdownV2Context';

export type AutoFilterDropdownV2OptionListProps = ComponentProps<'ul'> & {
  children: ReactNode;
};

export function AutoFilterDropdownV2OptionList({
  children,
  id,
  style,
  ...otherProps
}: AutoFilterDropdownV2OptionListProps) {
  const { state } = useAutoFilterDropdownV2Context();

  if (!state.areOptionsVisible) {
    return null;
  }

  return (
    <ul
      {...otherProps}
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
        ...style,
      }}
    >
      {children}
    </ul>
  );
}
