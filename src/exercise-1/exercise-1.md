EXERCISE #1 - Create a generic localStorage handler usable by React function component

1. Your API should enable any React function component to store a new key/value pair in the browser’s localStorage.

2. A component should also be able to subscribe to a specific key and receive updates when the corresponding value is added, updated, or deleted. Such an update should trigger a component re-render when needed.

3. Any component using your API must not be aware that localStorage is being used. All interactions with the native browser storage must be hidden from consumer components.

4. Changing the localStorage value outside of the scope of the React application should also send an update to subscribed components (a small delay is acceptable in that scenario).

5. Illustrate your handler with an example that uses at least two different components: One can set a value in localStorage using the API, and the other can receive any update and display it instantly on the screen.
