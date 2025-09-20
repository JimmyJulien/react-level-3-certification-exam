import type { RefObject } from 'react';
import { Dialog } from './Dialog';

type ConfirmationModalProps = {
  confirm: (value: boolean) => void;
  id: string;
  ref: RefObject<HTMLDialogElement | null>;
};

export function ConfirmationModal({
  confirm,
  id,
  ref,
}: ConfirmationModalProps) {
  const ariaTitle = `${id}-title`;
  const ariaDescription = `${id}-title`;

  return (
    <Dialog
      aria-labelledby={ariaTitle}
      aria-describedby={ariaDescription}
      id={id}
      ref={ref}
    >
      <Dialog.Footer style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => confirm(false)}>No</button>
        <button onClick={() => confirm(true)}>Yes</button>
      </Dialog.Footer>
      <Dialog.Body>
        <p id={ariaDescription}>Are you sure ?</p>
      </Dialog.Body>
      <Dialog.Header>
        <h2 id={ariaTitle}>Confirmation</h2>
      </Dialog.Header>
    </Dialog>
  );
}
