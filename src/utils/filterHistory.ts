import { getTime } from 'date-fns';
import { History } from '../lib';
import { Curry, go } from './functianal';

const byRange = (range: number, history: History) =>
  history.lastVisitTime >= (getTime(new Date()) - (range * 24 * 3600 * 1000));

const bySearchTerm = (searchTerm: string, history: History) => {
  return (
    history.origin.includes(searchTerm) ||
    history.title.includes(searchTerm)
  );
};

const byRemovedUrls = (urls: string[], acc: History[], history: History) => {
  if (!urls.some((url) => (new RegExp(url)).test(history.url))) {
    acc.push(history);
    return acc;
  }
  return acc;
};

const addOrigin = (history: History) => {
  const regex = /https:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}/;
  history.origin = history.url.match(regex) ? history.url.match(regex)[0] : history.title;
  return history;
};

const nomalize = (acc: any, history: History) => {
  if (!acc[history.origin]) acc[history.origin] = [];
  return (acc[history.origin].push(history), acc);
};

const byCurrentPage = (currentPage: string, history: History) =>
  (new RegExp(currentPage)).test(history.url);

const filterHistory = (
  histories: History[],
  { range, searchTerm, removedUrls }:
  { range: number, searchTerm: string, removedUrls: string[] }
): History[][] =>
  go(histories,
    Curry.map(addOrigin),
    Curry.uniqBy('title'),
    Curry.filter(byRange.bind(null, range)),
    Curry.filter(bySearchTerm.bind(null, searchTerm)),
    Curry.reduce(byRemovedUrls.bind(null, removedUrls), []),
    Curry.reduce(nomalize, {}),
    Curry.orederByDesc('length'),
    Curry.orederByDesc('lastVisitTime'));

const filterDetail = (
  histories: History[],
  { currentPage, searchTerm }: { currentPage: string, searchTerm: string }
): History[] =>
  go(histories,
    Curry.filter(byCurrentPage.bind(null, currentPage)),
    Curry.filter(bySearchTerm.bind(null, searchTerm)),
    Curry.orederByDesc('lastVisitTime'));

export {
  filterHistory,
  filterDetail,
};
