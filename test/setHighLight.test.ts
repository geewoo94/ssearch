import setHighlight from '../src/utils/setHighlight';

test('setHighlight', () => {
  const searchTerm = 'test';
  const target = 'sometesttext';
  const result = 'some<i>test</i>text';
  const highlighted = setHighlight(searchTerm, target);

  expect(highlighted).toEqual(result);
});
