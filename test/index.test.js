const functions = require('./index.js');

test('should return 4 for adding 2 + 2', () => {
  expect(functions.add(2, 2)).toBe(4);
});
