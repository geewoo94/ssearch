import { getTime } from 'date-fns';
import { History } from '../lib';
import {
  curry,
  map,
  reduce,
  filter,
  sort,
  descend,
  prop,
  uniqBy,
  go,
  values,
} from './functional';

/*
 * export for test list
 * byRange, bySearchTerm, byRemovedUrls, addOrigin,
 * nomalize, byCurrentPage
*/

export const byRange = curry((range: number, history: History) =>
  history.lastVisitTime >= (getTime(new Date()) - (range * 24 * 3600 * 1000)));

export const bySearchTerm = curry((searchTerm: string, history: History) =>
  (history.origin.includes(searchTerm) || history.title.includes(searchTerm)));

export const byRemovedUrls = curry((urls: string[], history: History) =>
  (!urls.some((url) => (new RegExp(url)).test(history.url))));

export const addOrigin = (history: History) => {
  const regex = /https:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}/;
  history.origin = history.url.match(regex) ? history.url.match(regex)[0] : history.title;
  return history;
};

export const nomalize = (acc: { [key: string]: History[] }, history: History) => {
  if (!acc[history.origin]) acc[history.origin] = [];
  return (acc[history.origin].push(history), acc);
};

export const byCurrentPage = curry((currentPage: string, history: History) =>
  (new RegExp(currentPage)).test(history.url));

const filterHistory = (
  histories: History[],
  { range, searchTerm, removedUrls }:
  { range: number, searchTerm: string, removedUrls: string[] }
): History[][] =>
  go(histories,
    map(addOrigin),
    uniqBy(prop('title')),
    filter(byRange(range)),
    filter(bySearchTerm(searchTerm)),
    filter(byRemovedUrls(removedUrls)),
    reduce(nomalize, {}),
    values,
    sort(descend(prop('length'))),
    map(sort(descend(prop('lastVisitTime')))));


const filterDetail = (
  histories: History[],
  { currentPage, searchTerm }: { currentPage: string, searchTerm: string }
): History[] =>
  go(histories,
    filter(byCurrentPage(currentPage)),
    filter(bySearchTerm(searchTerm)),
    sort(descend(prop('lastVisitTime'))));

export {
  filterHistory,
  filterDetail,
};
