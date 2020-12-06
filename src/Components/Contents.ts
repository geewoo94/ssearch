import { Button, Div, H1, Img, Input, Li, render, Ul, A } from '../_Factory/Element';

import { history } from '../types';
import './Contents.scss';

type SiteCardProps = {
  sites?: history[];
  setCurrentPage?: (val: string) => void;
  setRemovedUrls?: (val: string) => void;
}
function SiteCard({ sites, setCurrentPage, setRemovedUrls }: SiteCardProps) {
  const origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');

  const handleSetCurrentPage = (ev: Event) => {
    setCurrentPage((ev.target as HTMLElement).textContent);
  };

  const handleSearchInSite = (ev: Event) => {
    if (chrome.search) {
      chrome.search.query({
        text: `${(ev.target as HTMLInputElement).value} site:${origin}`,
        disposition: 'NEW_TAB',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      }, () => {});
    } else {
      console.log('searched!');
    }
  };

  return render(
    Div({ class: 'SiteCard-Wrapper' })(
      Button({
        event: {
          type: 'click',
          callback: () => setRemovedUrls(origin),
        }
      })('X'),
      Img({
        src: `https://www.google.com/s2/favicons?domain=${origin}`
      })(),
      H1({
        event: {
          type: 'click',
          callback: handleSetCurrentPage
        }
      })(origin),
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

type ContentsProps = {
  histories?: history[][];
  setCurrentPage?: (val: string) => void;
  setRemovedUrls?: (val: string) => void;
}
function Contents({ histories, setCurrentPage, setRemovedUrls }: ContentsProps): render {
  return render(
    Div({ class: 'Contents-Wrapper' })(
      ...histories.map((history) => SiteCard({
        sites: history.slice(0, 10),
        setCurrentPage,
        setRemovedUrls,
      })())
    )
  );
}

export default Contents;
