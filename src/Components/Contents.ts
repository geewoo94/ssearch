import { Button, Div, H1, Img, Input, Li, render, Ul, A } from '../_Factory/Element';
import { useDispatch, useSelector } from '../_Factory/Store';

import { history } from '../types';
import { setCurrentPage, setPreviews, setRemovedUrls } from '../store';
import './Contents.scss';
import '../types/global.ts';

const SCREENSHOT_URL = 'https://clm36vsh02.execute-api.ap-northeast-2.amazonaws.com/dev/start';

function SiteCard({ sites }: { sites: history[] }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const removedUrls = useSelector((state) => state.removedUrls);

  const origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');
  let tempOrigin = '';

  if (origin.toLowerCase().includes(searchTerm.toLowerCase())) {
    const regex = new RegExp(searchTerm);
    tempOrigin = origin.replace(regex, `<i>${searchTerm}</i>`);
  } else {
    tempOrigin = origin;
  }

  const handleSetCurrentPage = (val: string) => {
    window.scrollTo({ top: 0 });
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

  const popupScreenshot = async (inputUrl: string) => {
    Toastify({
      text: 'Saving...',
      duration: 2000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
      stopOnFocus: false,
    }).showToast();

    const url = `${SCREENSHOT_URL}?url=${inputUrl}`;
    const result = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { base64 } = await result.json();

    const previews = useSelector((state) => state.previews);
    dispatch(setPreviews([...previews, { url: inputUrl, base64 }]));

    Toastify({
      text: 'Saved!',
      duration: 2000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #f857a6, #ff5858)',
      stopOnFocus: false,
    }).showToast();
  };

  return render(
    Div({ class: 'SiteCard-Wrapper' })(
      Div()(
        Button({
          class: '.Close-Button',
          event: {
            type: 'click',
            callback: () => handleSetRemoveUrls(),
          }
        })('✄'),
      ),
      H1({
        event: {
          type: 'click',
          callback: (ev: Event) => handleSetCurrentPage((ev.target as HTMLElement).textContent),
        }
      })(tempOrigin),
      Input({
        placeholder: `${origin} 에서 검색`,
        event: {
          type: 'change',
          callback: (ev: Event) => handleSearchInSite((ev.target as HTMLInputElement).value),
        }
      })(),
      Ul()(
        ...sites.map((site) => {
          let tempTitle = '';

          if (site.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            const regex = new RegExp(searchTerm.toLowerCase());
            tempTitle = site.title.toLowerCase().replace(regex, `<i>${searchTerm}</i>`);
          } else {
            tempTitle = site.title;
          }

          return Li()(
            Img({
              event: {
                type: 'click',
                callback: () => popupScreenshot(site.url)
              },
              src: chrome.runtime ? `chrome://favicon/https://${origin}` : './main-icon16.png'
            })(),
            Div()(
              A({
                href: site.url,
                target: '_blank',
                title: site.url,
              })(tempTitle)
            )
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
