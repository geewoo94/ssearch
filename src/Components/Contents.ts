import { Button, Div, H1, Img, Input, Li, render, Ul, A } from '../_Factory/Element';
import { useDispatch, useSelector } from '../_Factory/Store';

import { history } from '../types';
import { setCurrentPage, setRemovedUrls } from '../store';
import './Contents.scss';

function SiteCard({ sites }: { sites: history[] }) {
  const dispatch = useDispatch();
  const removedUrls = useSelector((state) => state.removedUrls);
  const origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');

  const handleSetCurrentPage = (val: string) => {
    dispatch(setCurrentPage(val));
  };

  const handleSetRemoveUrls = () => {
    dispatch(setRemovedUrls([...removedUrls, origin]));
  };

  const handleSearchInSite = (val: string) => {
    chrome.search.query({
      text: `${val} site:${origin}`,
      disposition: 'NEW_TAB',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    }, () => {});
  };

  return render(
    Div({ class: 'SiteCard-Wrapper' })(
      Button({
        class: '.Close-Button',
        event: {
          type: 'click',
          callback: () => handleSetRemoveUrls(),
        }
      })('X'),
      Img({
        src: `https://www.google.com/s2/favicons?domain=${origin}`
      })(),
      H1({
        event: {
          type: 'click',
          callback: (ev: Event) => handleSetCurrentPage((ev.target as HTMLElement).textContent),
        }
      })(origin),
      Input({
        event: {
          type: 'change',
          callback: (ev: Event) => handleSearchInSite((ev.target as HTMLInputElement).value),
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

function Contents({ histories }: { histories?: history[][] }): render {
  return render(
    Div({ class: 'Contents-Wrapper' })(
      ...histories.map((history) => SiteCard({
        sites: history.slice(0, 10),
      })())
    )
  );
}

export default Contents;
