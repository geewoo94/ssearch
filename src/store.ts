import Store, { State } from './_Factory/Store';
import {
  TYPE,
  Action,
  InitialState,
  SetRange,
  SetSearchTerm,
  SetCurrentPage,
  SetRemovedUrls,
  SetHistories,
  SetLikedItems,
} from './types/store-lib';

const DEFAULT_RANGE = '7';
const DEFAULT_PAGE = 'Main';

const initialState: InitialState = {
  range: DEFAULT_RANGE,
  searchTerm: '',
  removedUrls: [],
  currentPage: DEFAULT_PAGE,
  histories: [],
  likedItems: [],
};

export const setRange: SetRange = (payload) => (
  { type: TYPE.SET_RANGE, payload }
);
export const setSearchTerm: SetSearchTerm = (payload) => (
  { type: TYPE.SET_SEARCH_TERM, payload }
);
export const setCurrentPage: SetCurrentPage = (payload) => (
  { type: TYPE.SET_CURRENT_PAGE, payload }
);
export const setRemovedUrls: SetRemovedUrls = (payload) => (
  { type: TYPE.SET_REMOVED_URLS, payload }
);
export const setHistories: SetHistories = (payload) => (
  { type: TYPE.SET_HISTORIES, payload }
);
export const setLikedItems: SetLikedItems = (payload) => (
  { type: TYPE.SET_LIKED_ITEMS, payload }
);

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case TYPE.SET_RANGE: {
      return {
        ...state,
        range: payload,
      };
    }
    case TYPE.SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: payload,
      };
    }
    case TYPE.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: payload,
      };
    }
    case TYPE.SET_REMOVED_URLS: {
      return {
        ...state,
        removedUrls: payload,
      };
    }
    case TYPE.SET_HISTORIES: {
      return {
        ...state,
        histories: payload,
      };
    }
    case TYPE.SET_LIKED_ITEMS: {
      return {
        ...state,
        likedItems: payload,
      };
    }
  }
};

Store.setInitialState(initialState);
Store.setReducer(reducer);

export default Store;
