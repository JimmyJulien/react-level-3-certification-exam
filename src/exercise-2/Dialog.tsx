import {
  Children,
  isValidElement,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

type DialogProps = ComponentProps<'dialog'> & { children: ReactNode };

/**
 * Dialog component that can be used as dialog or as modal.
 * 
 * To open as dialog, use the show method of the component ref.

 * To open as modal, use the showModal method of the component ref.
 * 
 * To close, use the close method of the component ref.
 * 
 * 
 */
export function Dialog({ children, ...otherProps }: DialogProps) {
  const header = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === Dialog.Header,
  );

  const body = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === Dialog.Body,
  );

  const footer = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === Dialog.Footer,
  );

  // Exercise 2 - spec 2
  return createPortal(
    <dialog {...otherProps}>
      {header}
      {body}
      {footer}
    </dialog>,
    document.body,
  );
}

// Exercise 2 - spec 3
type DialogHeaderProps = ComponentProps<'div'> & { children: ReactNode };

Dialog.Header = ({ children, ...otherProps }: DialogHeaderProps) => {
  return <div {...otherProps}>{children}</div>;
};

// Exercise 2 - spec 3
type DialogBodyProps = ComponentProps<'div'> & { children: ReactNode };

Dialog.Body = ({ children, ...otherProps }: DialogBodyProps) => {
  return <div {...otherProps}>{children}</div>;
};

// Exercise 2 - spec 3
type DialogFooterProps = ComponentProps<'div'> & { children: ReactNode };

Dialog.Footer = ({ children, ...otherProps }: DialogFooterProps) => {
  return <div {...otherProps}>{children}</div>;
};
