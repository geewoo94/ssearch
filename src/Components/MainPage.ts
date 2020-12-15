import simpleShadowDom from 'simple-shadow-dom';
import store from '../store';
import { throttle } from 'lodash';
import * as Toastify from 'toastify-js';

import { history } from '../types';
import { filterHistory } from '../utils/filterHistory';
import style from './MainPage.style';
import { PAGES, State } from '../lib';

const SiteCard = (sites: history[]) => {
  const origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');
  const filteredOrigin = origin.replace(/www./, '').replace(/.com/, '');

  return `
    <div class='SiteCard-Wrapper'>
      <div class='Close-Button-Wrapper'>
        <button class='Close-Button' data-origin=${origin}>✄</button>
      </div>
      <h1 class='Origin' data-origin=${origin}>${filteredOrigin}</h1>
      <input placeholder='${origin} 에서 검색' data-origin=${origin}></input>
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

type Props = { histories: history[][], isCurrentPage: boolean, pageCount: number };

const template = ({ histories, isCurrentPage, pageCount }: Props) => {
  const cardCount = pageCount * 6;

  return (`
    <div class='Contents-Wrapper ${isCurrentPage ? '' : 'hide'}'>
      ${histories.slice(0, cardCount).map((history) => {
        return SiteCard(history.slice(0, 10));
      }).join('')}
    </div>
  `);
};

class MainPage extends simpleShadowDom {
  _isTriggered = false;

  constructor() {
    super();

    const WEEK_BY_MILLISECOND = (7 * 24 * 3600 * 1000);
    const query = {
      text: '',
      maxResults: 0,
      startTime: (new Date()).getTime() - WEEK_BY_MILLISECOND,
      endTime: (new Date()).getTime()
    };

    chrome.history.search(query, (history) => {
      store.setItem(State.HISTORIES, history);
    });

    this.setTemplate(template);
    this.setStyle(style);
    this.setState({ histories: [], isCurrentPage: true, pageCount: 1 });
    this.render();
  }

  async contentClickEvent(e: Event) {
    if ((e.target as HTMLButtonElement).classList.contains('Close-Button')) {
      const origin = (e.target as HTMLButtonElement).dataset.origin;
      const removedUrls = store.getItem(State.REMOVED_URLS);
      store.setItem(State.REMOVED_URLS, [...removedUrls, origin]);
      return;
    }

    if ((e.target as HTMLButtonElement).classList.contains('Image-Save')) {
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
        const result = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { base64 } = await result.json();

        const previews = store.getItem(State.PREVIEWS);
        store.setItem(State.PREVIEWS, [...previews, { url: inputUrl, base64 }]);

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

    if ((e.target as HTMLHeadingElement).classList.contains('Origin')) {
      const origin = (e.target as HTMLHeadingElement).dataset.origin;
      store.setItem(State.CURRENT_PAGE, origin);
      window.scrollTo({ top: 0 });
    }
  }

  filter(histories: history[]) {
    const searchTerm = store.getItem(State.SEARCH_TERM);
    const range = Number(store.getItem(State.RANGE_VALUE));
    const removedUrls = store.getItem(State.REMOVED_URLS);

    const filteredHistories = filterHistory(histories, {
      range,
      searchTerm,
      removedUrls,
    });

    return filteredHistories;
  }

  contentKeydownEvent(e: KeyboardEvent) {
    if (e.key === 'Enter' && !this._isTriggered) {
      const target = e.target as HTMLInputElement;
      const origin = target.dataset.origin;

      chrome.search.query({
        text: `${target.value} site:${origin}`,
        disposition: 'NEW_TAB',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }, () => { });

      this._isTriggered = true;
    }
  }

  contentKeyupEvent(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._isTriggered = false;
    }
  }

  connectedCallback() {
    store.subscribe(State.HISTORIES, (histories) => {
      const filteredHistories = this.filter(histories);
      this.setState((prev: Props) => ({...prev, histories: filteredHistories}));
      this.render();
    });

    store.subscribe(State.REMOVED_URLS, () => {
      const histories = store.getItem(State.HISTORIES);
      const filteredHistories = this.filter(histories);
      this.setState((prev: Props) => ({...prev, histories: filteredHistories}));
      this.render();
    });

    store.subscribe(State.SEARCH_TERM, () => {
      const histories = store.getItem(State.HISTORIES);
      const filteredHistories = this.filter(histories);
      this.setState((prev: Props) => ({...prev, histories: filteredHistories}));
      this.render();
    });

    store.subscribe(State.RANGE_VALUE, () => {
      const histories = store.getItem(State.HISTORIES);
      const filteredHistories = this.filter(histories);
      this.setState((prev: Props) => ({...prev, histories: filteredHistories}));
      this.render();
    });

    store.subscribe(State.CURRENT_PAGE, (page) => {
      if(page === PAGES.main) {
        this.setState((prev: Props) => ({...prev, isCurrentPage: true}));
        this.render();
      } else {
        this.setState((prev: Props) => ({ ...prev, isCurrentPage: false }));
        this.render();
      }
    });

    this.shadowRoot.addEventListener('click', this.contentClickEvent.bind(this));
    this.shadowRoot.addEventListener('keydown', this.contentKeydownEvent.bind(this));
    this.shadowRoot.addEventListener('keyup', this.contentKeyupEvent.bind(this));

    const throttleAddPage = throttle(() => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight,
      } = document.documentElement;
      const currentPage = store.getItem(State.CURRENT_PAGE);
      if ((scrollTop + clientHeight) === scrollHeight && currentPage === PAGES.main) {
        const pageCount = store.getItem(State.PAGE_COUNT) + 1;
        store.setItem(State.PAGE_COUNT, pageCount);

        this.setState((prev: Props) => ({...prev, pageCount }));
        this.render();
      }
    }, 1000, { leading: false });

    window.addEventListener('scroll', throttleAddPage);
  }
}

export default MainPage;
