import { ConfirmationModal } from './ConfirmationModal';
import { Toast } from './Toast';
import { useDialog } from './use-dialog';
import { useToast } from './use-toast';

export function Exercise2() {
  const {
    ref: confirmationDialogRef,
    openModal: openConfirmationModal,
    close: closeConfirmationModal,
  } = useDialog();

  const { hideToast, showToast, toastProps } = useToast();

  function confirm(isConfirmed: boolean) {
    closeConfirmationModal();

    if (isConfirmed) {
      showToast({ text: 'Your action has been executed', type: 'success' });
    } else {
      showToast({ text: 'Your action has been cancelled', type: 'info' });
    }
  }

  // Exercise 2 - spec 4
  return (
    <section aria-labelledby="exercise-2">
      <h2 id="exercise-2">Exercise 2</h2>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <button onClick={openConfirmationModal}>Open confirmation modal</button>
        <button onClick={hideToast}>Close toast</button>
      </div>

      <ConfirmationModal
        confirm={confirm}
        id={'confirmation-modal'}
        ref={confirmationDialogRef}
      />

      <Toast {...toastProps} />
    </section>
  );
}
