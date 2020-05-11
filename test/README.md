# Testing

## Unit Tests
Unit Tests are written in Jest. They make use of the `vue-test-utils`
package when testing Vue components.

These are the guidelines we are following when writing unit tests:

- Split tests into logical groupings, using `describe()`
- Consider all combinations of inputs (props, store, etc)
- Test all combinations of outputs (events, HTML, etc)
- Mock the dependencies required

Remember: For all combinations of inputs, test all outputs, and mock dependencies. Don't test implementation.
