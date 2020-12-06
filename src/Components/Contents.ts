import { Button, Div, H1, Img, Input, Li, render, Ul, A, Form } from '../_Factory/Element';

import { history } from '../types';
import './Contents.scss';

function SiteCard({ sites, setRemovedUrls }: {
  sites: history[],
  setRemovedUrls: (val: string) => void,
}) {
  const origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');

  const handleSearchInSite = (ev: Event) => {
    if (chrome.search) {
      chrome.search.query({
        text: (ev.target as HTMLInputElement).value + ' ' + `site:${origin}`,
        disposition: 'NEW_TAB',
      }, () => {});
    } else {
      console.log('searched!');
    }
  };

  return render(
    Div({ class: 'SiteCard-Wrapper' })(
      Button({
        class: 'Close-Button',
        event: {
          type: 'click',
          callback: () => setRemovedUrls(origin),
        }
      })('X'),
      Img({
        src: `https://www.google.com/s2/favicons?domain=${origin}`
      })(),
      H1()(origin),
      Input({
        event: {
          type: 'change',
          callback: handleSearchInSite
        }
      })(),
      Ul()(
        ...sites.map((site) => {
          return Li()(
            A({
              href: site.url,
              target: '_blank',
              title: site.url,
            })(site.title)
          );
        })
      )
    )
  );
}

function Contents({ histories, setRemovedUrls }:{
  histories: history[][],
  setRemovedUrls: (val: string) => void,
}): render {
  return render(
    Div({ class: 'Contents-Wrapper' })(
      ...histories.map((history) => SiteCard({
        sites: history.slice(0, 10),
        setRemovedUrls,
      })())
    )
  );
}

export default Contents;
