import DOMPurify from 'dompurify';
import type { ComponentProps } from 'react';
import { useAutoFilterDropdownV2Context } from './AutoFilterDropdownV2Context';

export type AutoFilterDropdownV2OptionTextProps = Omit<
  ComponentProps<'span'>,
  'children' | 'dangerouslySetInnerHTML'
> & { text: string };

export function AutoFilterDropdownV2OptionText({
  text,
  ...otherProps
}: AutoFilterDropdownV2OptionTextProps) {
  const purifiedText = DOMPurify.sanitize(text);

  const {
    state: { filter },
  } = useAutoFilterDropdownV2Context();

  const regex = new RegExp(`(${filter})`, 'gi');

  // Exercise 3 - spec 4
  const formattedText = filter
    ? purifiedText.replace(regex, '<b>$1</b>')
    : purifiedText;

  return (
    <span {...otherProps} dangerouslySetInnerHTML={{ __html: formattedText }} />
  );
}
