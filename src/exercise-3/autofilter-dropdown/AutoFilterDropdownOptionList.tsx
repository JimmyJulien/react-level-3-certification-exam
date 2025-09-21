import type { ComponentProps, ReactNode } from 'react';
import { useAutoFilterDropdownContext } from './AutoFilterDropdownContext';

export type AutoFilterDropdownOptionListProps = ComponentProps<'ul'> & {
  children: ReactNode;
};

export function AutoFilterDropdownOptionList({
  children,
  id,
  style,
  ...otherProps
}: AutoFilterDropdownOptionListProps) {
  const { areOptionsVisible } = useAutoFilterDropdownContext();

  if (!areOptionsVisible) {
    return null;
  }

  return (
    <ul
      {...otherProps}
      id={`autofilter-dropdown-list-${id}`}
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
