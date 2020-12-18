import { get, set } from 'lodash';
import { Store, State, Subscriber, Subscribers, PAGES } from './lib';
import { each } from './utils/functional';

const store = (() => {
  const _store: Store = {};
  const _subscribers: Subscribers<State> = {};

  const getItem = <S extends State>(path: S): Store[S] => get(_store, path);

  const setItem = <S extends State>(path: S, value: Store[S]) => {
    set(_store, path, value);
    if (!_subscribers[path]) _subscribers[path] = new Set();
    each((subscriber: Subscriber<S>) => subscriber(value), _subscribers[path]);
  };

  const subscribe = <S extends State>(path: S, callback: Subscriber<S>) =>
    (_subscribers[path] || new Set()).add(callback);

  return {
    getItem,
    setItem,
    subscribe,
  };
})();

export const initialSetting = () => {
  store.setItem(State.SEARCH_TERM, '');
  store.setItem(State.RANGE_VALUE, '7');
  store.setItem(State.CURRENT_PAGE, PAGES.main);
  store.setItem(State.REMOVED_URLS, []);
  store.setItem(State.PAGE_COUNT, 1);
};

store.setItem(State.SEARCH_TERM, '');
store.setItem(State.RANGE_VALUE, '7');
store.setItem(State.CURRENT_PAGE, PAGES.main);

store.setItem(State.HISTORIES, []);
store.setItem(State.REMOVED_URLS, []);
store.setItem(State.LIKED, []);
store.setItem(State.PAGE_COUNT, 1);

store.setItem(State.PREVIEWS, []);

export default store;
