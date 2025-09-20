import { Exercise1Display } from './Exercise1Display';
import { Exercise1Form } from './Exercise1Form';

export function Exercise1() {
  return (
    <section aria-labelledby="exercise-1">
      <h2 id="exercise-1">Exercise 1</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gap: '3rem',
        }}
      >
        <Exercise1Form />
        <Exercise1Display />
      </div>
    </section>
  );
}
