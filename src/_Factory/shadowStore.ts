import { get, set } from 'lodash';

const curry = (fn: any) => (...arg: any) =>
  (arg.length >= fn.length) ? fn(...arg) : curry(fn.bind(null, ...arg));

const each = curry((fn: any, iter: any) => {
  for (const a of iter) {
    fn(a);
  }
});

const store = (() => {
  const _store = {};
  const _subscribers: { [key: string]: any } = {};

  const getItem = (path: string) => get(_store, path);

  const setItem = (path: string, value: any) => {
    set(_store, path, value);
    if (!_subscribers[path]) _subscribers[path] = new Set();
    each((subscriber: (val: any) => void) => subscriber(value), _subscribers[path]);
  };

  const subscribe = (path: string, callback: (val: any) => void) =>
    (_subscribers[path] || new Set()).add(callback);

  return {
    getItem,
    setItem,
    subscribe,
  };
})();

export const PAGES = {
  main: 'Main',
  liked: 'Liked',
  previews: 'Previews',
};

export const SEARCH_TERM = 'header/searchTerm';
export const RANGE_VALUE = 'header/rangeValue';
export const CURRENT_PAGE = 'header/currentPage';

export const HISTORIES = 'mainPage/histories';
export const REMOVED_URLS = 'mainPage/removedUrls';
export const LIKED = 'mainPage/liked';
export const PAGE_COUNT = 'mainPage/pageCount';

export const PREVIEWS = 'previewPage/previews';

export const initialSetting = () => {
  store.setItem(SEARCH_TERM, '');
  store.setItem(RANGE_VALUE, '7');
  store.setItem(CURRENT_PAGE, PAGES.main);
  store.setItem(REMOVED_URLS, []);
  store.setItem(PAGE_COUNT, 1);
};

store.setItem(SEARCH_TERM, '');
store.setItem(RANGE_VALUE, '7');
store.setItem(CURRENT_PAGE, PAGES.main);

store.setItem(HISTORIES, []);
store.setItem(REMOVED_URLS, []);
store.setItem(LIKED, []);
store.setItem(PAGE_COUNT, 1);

store.setItem(PREVIEWS, []);

export default store;
