EXERCISE #3 - Create a generic auto-filter dropdown component to filter any kind of data
The user should be able to filter a data list by typing text into the dropdown as in the example here (this example shows countries, but your component should be generic enough to support any list of data as well, not just countries).

1. If the user types 'En', then only the items that have ‘en’ in their name should show up in the list.

2. The filter should not be case-sensitive.

3. We should be able to specify (as a prop) which object property name is used for both the option label and filtering (for instance, “name” or “description”).

4. The matching portion(s) of the option label should be rendered in bold text, for instance, (En)tertainm(en)t

5. The user should be able to select a list item that will be returned by the component using a callback prop called "valueChange".

6. No third-party component is allowed for the dropdown, just regular HTML/CSS/ React.

7. To illustrate its behavior, use your new auto-filter dropdown with two different data samples in a test component. You can use this free public API as one example: https://jsonplaceholder.typicode.com/users
