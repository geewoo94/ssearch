export interface History extends chrome.history.HistoryItem {
  origin?: string;
  count?: number;
}

export interface Liked {
  count: number;
  url: string;
  title: string;
}

export interface Preview {
  url: string;
  base64: string;
}

export enum State {
  SEARCH_TERM = 'header/searchTerm',
  RANGE_VALUE = 'header/rangeValue',
  CURRENT_PAGE = 'header/currentPage',
  HISTORIES = 'mainPage/histories',
  REMOVED_URLS = 'mainPage/removedUrls',
  LIKED = 'mainPage/liked',
  PAGE_COUNT = 'mainPage/pageCount',
  PREVIEWS = 'previewPage/previews',
}

export interface Store {
  [State.SEARCH_TERM]?: string;
  [State.RANGE_VALUE]?: string;
  [State.CURRENT_PAGE]?: string;
  [State.HISTORIES]?: History[];
  [State.REMOVED_URLS]?: string[];
  [State.LIKED]?: Liked[];
  [State.PAGE_COUNT]?: number;
  [State.PREVIEWS]?: Preview[];
}

export enum PAGES {
  main = 'Main',
  liked = 'Liked',
  previews = 'Previews',
}

export type Subscriber<S extends State> = (val: Store[S]) => void;
export type Subscribers<S extends State> = { [key in State]?: Set<Subscriber<S>> }
