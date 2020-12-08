export type range = string;
export type searchTerm = string;
export type removedUrls = string[];
export type currentPage = string;
export type histories = chrome.history.HistoryItem[];
export type likedItems = { title: string, url: string, count: number }[];

export interface InitialState {
  range?: range;
  searchTerm?: searchTerm;
  removedUrls?: removedUrls;
  currentPage?: currentPage;
  histories?: histories;
  likedItems?: likedItems;
}

export enum TYPE {
  'SET_RANGE',
  'SET_SEARCH_TERM',
  'SET_CURRENT_PAGE',
  'SET_REMOVED_URLS',
  'SET_HISTORIES',
  'SET_LIKED_ITEMS',
}

export enum NAV_MENU {
  'MAIN',
  'LIKED',
}

export type payload = NAV_MENU | range | searchTerm | removedUrls | currentPage | histories | likedItems;
export type Action = { type: TYPE, payload: payload };

export type SetRange = (payload: string) => Action;
export type SetSearchTerm = (payload: string) => Action;
export type SetCurrentPage = (payload: NAV_MENU | string) => Action;
export type SetRemovedUrls = (payload: string[]) => Action;
export type SetHistories = (payload: chrome.history.HistoryItem[]) => Action;
export type SetLikedItems = (payload: {
  title: string,
  url: string,
  count: number,
}[]) => Action;
