import type { Exercise1Model } from './Exercise1Model';
import { useStorageState } from './useStorageState';

// Exercise 1 - spec 5
export function Exercise1Display() {
  const { value } = useStorageState<Exercise1Model>('exercise-1-form');

  return (
    <div>
      <label htmlFor="value">Value :</label>
      <pre id="value">
        {value ? JSON.stringify(value, null, 2) : 'Not defined'}
      </pre>
    </div>
  );
}
