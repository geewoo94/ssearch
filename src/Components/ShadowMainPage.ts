// import { render } from '../_Factory/Element';
// import { useDispatch, useSelector } from '../_Factory/Store';

// import Contents from './Contents';
import { history } from '../types';
import { filterHistory } from '../utils/filterHistory';
import * as Toastify from 'toastify-js';
// import { useEffect, useState } from '../_Factory/App';
// import { setScrollPage } from '../store';

// function MainPage({ histories }: { histories: history[] }) {
//   const {
//     range,
//     searchTerm,
//     removedUrls,
//     scrollPage,
//   } = useSelector();
//   const dispatch = useDispatch();
//   const [hasScroll, setHasScroll] = useState(false);

//   useEffect(() => {
//     if (hasScroll) return;

//     setHasScroll(true);

//     function addPage() {
//       const {
//         scrollTop,
//         clientHeight,
//         scrollHeight,
//       } = document.documentElement;
//       if ((scrollTop + clientHeight) === scrollHeight) {
//         const scrollPage = useSelector((state) => state.scrollPage);
//         dispatch(setScrollPage(scrollPage + 1));
//       }
//     }

//     window.addEventListener('scroll', addPage);
//   }, []);

//   const filteredHistories = filterHistory(histories, {
//     range: Number(range),
//     searchTerm,
//     removedUrls,
//   });

//   return render(
//     Contents({ histories: filteredHistories.slice(0, 4 * scrollPage) })(),
//   );
// }

// export default MainPage;

import TinyComponent, { store } from '../_Factory/ShadowComponent';
import { SEARCH_TERM, RANGE_VALUE } from './ShadowHeader';

import style from './ShadowMainPage.style';

const SiteCard = (sites: history[]) => {
  let origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');
  origin = origin.replace(/www./, '');
  origin = origin.replace(/.com/, '');

  return `
    <div class='SiteCard-Wrapper'>
      <div class='Close-Button-Wrapper'>
        <button class='Close-Button' data-origin=${origin}>✄</button>
      </div>
      <h1 class='Origin'>${origin}</h1>
      <input placeholder='${origin} 에서 검색'></input>
      <ul>
        ${sites.map((site) => {
          return `
            <li>
              <div>
                <img src=${chrome.runtime ? `chrome://favicon/https://${origin}` : './main-icon16.png'} class='Image-Save' data-url=${site.url}></img>
                <p>10분 전</p>
              </div>
              <div class='Anchor-Wrapper'>
                <a href=${site.url} target='_blank' title=${site.url}>${site.title}</a>
              </div>
            </li>
          `;
        }).join('')}
      </ul>
    </div>`;
};

const template = (histories: history[][]) => {
  return (`
    <div class='Contents-Wrapper'>
      ${histories.map((history) => {
        return SiteCard(history.slice(0, 10));
      }).join('')}
    </div>
  `);
};

const HISTORIES = 'mainPage/histories';
const REMOVED_URLS = 'mainPage/removedUrls';
const PREVIEWS = 'mainPage/previews';

class MainPage extends TinyComponent {
  constructor() {
    super();

    const initialHistories: history[] = [];
    const initialRemovedUrls: string[] = [];

    store.setState(HISTORIES, initialHistories);
    store.setState(REMOVED_URLS, initialRemovedUrls);
    store.setState(PREVIEWS, []);

    const WEEK_BY_MILLISECOND = (7 * 24 * 3600 * 1000);
    const query = {
      text: '',
      maxResults: 0,
      startTime: (new Date()).getTime() - WEEK_BY_MILLISECOND,
      endTime: (new Date()).getTime()
    };

    chrome.history.search(query, (history) => {
      store.setState(HISTORIES, history);
    });

    this.setTemplate(template);
    this.setStyle(style);
    this.setState([]);
    this.render();
  }

  async contentEvent(e: Event) {
    if ((e.target as HTMLButtonElement).classList.contains('Close-Button')) {
      const origin = (e.target as HTMLButtonElement).dataset.origin;
      const removedUrls = store.getState(REMOVED_URLS);
      store.setState(REMOVED_URLS, [...removedUrls, origin]);
      return;
    } else if ((e.target as HTMLButtonElement).classList.contains('Image-Save')) {
      const SCREENSHOT_URL = 'https://clm36vsh02.execute-api.ap-northeast-2.amazonaws.com/dev/start';
      const inputUrl = (e.target as HTMLImageElement).dataset.url;

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

      try {
        const url = `${SCREENSHOT_URL}?url=${inputUrl}`;
        console.log(url);
        const result = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { base64 } = await result.json();

        const previews = store.getState(PREVIEWS);
        store.setState(PREVIEWS, [...previews, { url: inputUrl, base64 }]);

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
      } catch (err) {
        Toastify({
          text: 'Error occured... please tyy again',
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: 'linear-gradient(to right, #f857a6, #ff5858)',
          stopOnFocus: false,
        }).showToast();
      }
    }
  }

  filter(histories: history[]) {
    const searchTerm = store.getState(SEARCH_TERM);
    const range = store.getState(RANGE_VALUE);
    const removedUrls = store.getState(REMOVED_URLS);

    const filteredHistories = filterHistory(histories, {
      range,
      searchTerm,
      removedUrls,
    });

    return filteredHistories;
  }

  connectedCallback() {
    store.subscribe(HISTORIES, (histories: history[]) => {
      const filteredHistories = this.filter(histories);
      this.setState(filteredHistories);
      this.render();
    });

    store.subscribe(REMOVED_URLS, () => {
      const histories = store.getState(HISTORIES);
      const filteredHistories = this.filter(histories);
      this.setState(filteredHistories);
      this.render();
    });

    store.subscribe(SEARCH_TERM, () => {
      const histories = store.getState(HISTORIES);
      const filteredHistories = this.filter(histories);
      this.setState(filteredHistories);
      this.render();
    });

    store.subscribe(RANGE_VALUE, () => {
      const histories = store.getState(HISTORIES);
      const filteredHistories = this.filter(histories);
      this.setState(filteredHistories);
      this.render();
    });

    this.shadowRoot.addEventListener('click', this.contentEvent.bind(this));
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.contentEvent.bind(this));
  }
}

export default MainPage;
