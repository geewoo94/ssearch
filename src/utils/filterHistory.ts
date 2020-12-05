import { history } from '../types';

class Filter {
  histories: history[];

  constructor(histories: history[]) {
    this.histories = histories;
  }

  filterByRange(range: number) {
    this.histories = this.histories.filter((history) => {
      const startTime = (new Date()).getTime() - (range * 24 * 3600 * 1000);

      return history.lastVisitTime >= startTime;
    });

    return this;
  }

  filterBySearchTerm(searchTerm: string) {
    this.histories = this.histories.filter((history) => {
      if (history.url.includes(searchTerm)) {
        return true;
      } else if (history.title.includes(searchTerm)) {
        return true;
      } else {
        return false;
      }
    });

    return this;
  }

  filterByRemovedUrls(removedUrls: string[]) {
    this.histories = this.histories.filter((history) => {
      return !removedUrls.some((url) => {
        const regex = new RegExp(url);
        return regex.test(history.url);
      });
    });

    return this;
  }

  sortByTime() {
    return this;
  }

  nomalize(): history[][] {
    const regex = /https:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}/;
    const nomalized = this.histories.reduce((acc: { [key: string]: history[] }, cur: history) => {
      const matched = cur.url.match(regex);

      if (!matched) return acc;

      const root = matched[0];

      if (!acc[root]) acc[root] = [];

      cur.origin = root;
      acc[root].push(cur);

      return acc;
    }, {});

    const urls: history[][] = [];

    for (const prop in nomalized) {
      urls.push(nomalized[prop]);
    }

    urls.sort((a: history[], b: history[]) => b.length - a.length);
    urls.forEach((url) => url.sort((a, b) => a.lastVisitTime - b.lastVisitTime));

    return urls;
  }
}

function filterHistory(histories: history[], {
  range,
  searchTerm,
  removedUrls,
}: { range: number, searchTerm: string, removedUrls: string[] }): history[][]{
  return (
    new Filter(histories)
      .filterByRange(range)
      .filterBySearchTerm(searchTerm)
      .filterByRemovedUrls(removedUrls)
      .sortByTime()
      .nomalize()
  );
}

export default filterHistory;
