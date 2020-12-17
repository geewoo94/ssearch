import {
  byRange,
  bySearchTerm,
  byRemovedUrls,
  addOrigin,
  nomalize,
  byCurrentPage,
} from '../src/utils/filterHistory';
import 'jest';

const mockTime = 1.60689331E12;
const diffDate = 3;
const mockHistory = {
  id: '7664',
  lastVisitTime: mockTime,
  title: 'geewoo94/ssearch: search your search history chrome extension',
  typedCount: 0,
  url: 'https://github.com/geewoo94/ssearch',
  visitCount: 5,
};

const mockHistoryWithOrigin = {
  id: '7664',
  lastVisitTime: mockTime,
  title: 'geewoo94/ssearch: search your search history chrome extension',
  typedCount: 0,
  url: 'https://github.com/geewoo94/ssearch',
  visitCount: 5,
  origin: 'https://github.com'
};

jest.mock('date-fns', () => {
  return {
    getTime: () => mockTime + diffDate * 24 * 3600 * 1000,
  };
});

describe('filter methods', () => {
  test('byRange', () => {
    expect(byRange(diffDate - 1, mockHistory)).toEqual(false);
    expect(byRange(diffDate, mockHistory)).toEqual(true);
    expect(byRange(diffDate + 1, mockHistory)).toEqual(true);
  });

  test('bySearchTerm', () => {
    const searchTerm1 = 'history';
    const searchTerm2 = 'github';
    const searchTerm3 = 'abc';

    expect(bySearchTerm(searchTerm1, mockHistoryWithOrigin)).toEqual(true);
    expect(bySearchTerm(searchTerm2, mockHistoryWithOrigin)).toEqual(true);
    expect(bySearchTerm(searchTerm3, mockHistoryWithOrigin)).toEqual(false);
  });

  test('byRemovedUrls', () => {
    const removedUrls = ['github.com'];
    const removedUrls2 = ['example.com'];

    expect(byRemovedUrls(removedUrls, mockHistory)).toEqual(false);
    expect(byRemovedUrls(removedUrls2, mockHistory)).toEqual(true);
  });

  test('addOrigin', () => {
    expect(addOrigin(mockHistory)).toEqual(mockHistoryWithOrigin);
  });

  test('nomalize', () => {
    const acc = {};
    const result = { 'https://github.com': [mockHistory] };

    expect(nomalize(acc, mockHistory)).toEqual(result);
  });

  test('byCurrentPage', () => {
    const currentPage = 'github.com';
    expect(byCurrentPage(currentPage, mockHistory)).toEqual(true);
  });
});
