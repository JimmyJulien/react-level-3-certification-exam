import type { Exercise1Model } from './Exercise1Model';
import { useStorageState } from './useStorageState';

// Exercise 1 - spec 5
export function Exercise1Form() {
  const { setValue } = useStorageState<Exercise1Model>('exercise-1-form');

  function onSubmit(formData: FormData) {
    const name = formData.get('name');
    const code = formData.get('code');
    const birthDate = formData.get('birth-date');
    const autorizations = formData.getAll('autorizations');

    setValue({
      name: name ? String(name) : null,
      code: code ? Number(code) : null,
      birthDate: birthDate ? new Date(birthDate.toString()) : null,
      autorizations: autorizations.map((autorization) =>
        autorization.toString(),
      ),
    });
  }

  return (
    <form action={onSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="form-field">
        <label htmlFor="code">Code</label>
        <input type="number" id="code" name="code" />
      </div>
      <div className="form-field">
        <label htmlFor="birth-date">Birth date</label>
        <input type="date" id="birth-date" name="birth-date" />
      </div>
      <div className="form-field">
        <label htmlFor="autorizations">Autorizations</label>
        <select name="autorizations" id="autorizations" multiple>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="execute">Execute</option>
        </select>
      </div>
      <div style={{ marginTop: 16 }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
