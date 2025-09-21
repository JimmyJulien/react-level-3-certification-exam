import DOMPurify from 'dompurify';
import type { ComponentProps } from 'react';
import { useAutoFilterDropdownContext } from './AutoFilterDropdownContext';

export type AutoFilterDropdownOptionTextProps = Omit<
  ComponentProps<'span'>,
  'children' | 'dangerouslySetInnerHTML'
> & { text: string };

export function AutoFilterDropdownOptionText({
  text,
  ...otherProps
}: AutoFilterDropdownOptionTextProps) {
  const purifiedText = DOMPurify.sanitize(text);

  const { filter } = useAutoFilterDropdownContext();

  const regex = new RegExp(`(${filter})`, 'gi');

  const formattedText = filter
    ? purifiedText.replace(regex, '<b>$1</b>')
    : purifiedText;

  return (
    <span {...otherProps} dangerouslySetInnerHTML={{ __html: formattedText }} />
  );
}
