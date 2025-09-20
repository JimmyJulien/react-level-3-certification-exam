import type { Exercise1Model } from './Exercise1Model';
import { useStorageState } from './use-storage-state';

// Exercise 1 - spec 5
export function Exercise1Display() {
  const { value } = useStorageState<Exercise1Model>('exercise-1-form');

  return (
    <div>
      <h3>Storage value</h3>
      <pre>{value ? JSON.stringify(value, null, 2) : 'Not defined'}</pre>
    </div>
  );
}
