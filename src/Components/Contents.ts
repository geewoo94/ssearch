import { Div, H1, Input, Li, render, Ul } from "../_Factory/Element";

import { history } from '../types';

function SiteCard({ sites }: { sites: history[] }) {
  const origin = sites[0].origin;

  sites.sort((a, b) => {
    return a.lastVisitTime - b.lastVisitTime;
  });

  return render(
    Div()(
      H1()(origin),
      Input()(),
      Ul()(
        ...sites.map((site) => Li()(site.title.slice(0, 50) + '...' + '[미리보기]'))
      )
    )
  );
}

function Contents({ histories }: { histories: history[] }) {
  const regex = /https:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\//;
  const nomalized = histories.reduce((acc: any, cur: history) => {
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

  urls.sort((a: history[], b: history[]) => {
    return b.length - a.length;
  });
  console.log(urls);
  return render(
    Div()(
      ...urls.map((url) => SiteCard({ sites: url.slice(0, 10) })())
    )
  );
}

export default Contents;
