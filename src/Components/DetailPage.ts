import { formatDistance, getTime } from 'date-fns';
import simpleShadowDom from 'simple-shadow-dom';
import * as sanitize from 'sanitize-html';
import { History, PAGES, State } from '../lib';

import store from '../store';
import { filterDetail } from '../utils/filterHistory';
import { includes } from '../utils/functianal';
import style from './DetailPage.style';

type Props = { histories: History[], currentPage: string, isCurrentPage: boolean };

const template = ({ histories, currentPage, isCurrentPage}: Props) => {
  const searchTerm = store.getItem(State.SEARCH_TERM);
  const filtered = filterDetail(histories, { currentPage, searchTerm }) || [];
  const origin = filtered[0]?.origin?.replace(/(^\w+:|^)\/\//, '');
  const filteredOrigin = origin?.replace(/www./, '').replace(/.com/, '');
  const currentTime = getTime(new Date());

  return (`
    <div class='DetailContents-Wrapper ${isCurrentPage ? '' : 'hide'}'>
      <h1>${filteredOrigin}</h1>
      <div>
        <ul>
          ${filtered.map((history) => {
            const { lastVisitTime } = history;
            const formatTime = formatDistance(currentTime, lastVisitTime);
            const sanitizedTitle = sanitize(history.title, { disallowedTagsMode: 'escape' });

            let highlightedTitle = '';

            if (sanitizedTitle.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== '') {
              const regex = new RegExp(searchTerm, 'gi');
              highlightedTitle = sanitizedTitle.replace(regex, `<i>${searchTerm}</i>`);
            } else {
              highlightedTitle = sanitizedTitle;
            }

            return (`
              <li>
                <div>
                  <img src=${chrome.runtime ? `chrome://favicon/https://${origin}` : './main-icon16.png'} class='Image-Save' data-url=${history.url}></img>
                  <p>${formatTime} ago</p>
                </div>
                <div>
                  <a href=${history.url} target='_blank' title=${history.url}>${highlightedTitle}</a>
                </div>
              </li>
            `);
          }).join('')}
        </ul>
      </div>
    </div>
  `);
};

class DetailPage extends simpleShadowDom {
  constructor() {
    super();

    chrome.storage.sync.get(({ likedItems }) => {
      store.setItem(State.LIKED, likedItems);
    });

    this.setState({ histories: [], currentPage: '', isCurrentPage: false });
    this.setStyle(style);
    this.setTemplate(template);
    this.render();
  }

  connectedCallback() {
    store.subscribe(State.CURRENT_PAGE, (currentPage) => {
      if (!includes(currentPage , Object.values(PAGES))) {
        const histories = store.getItem(State.HISTORIES);
        this.setState({ histories, currentPage, isCurrentPage: true });
        this.render();
      } else {
        this.setState((pre: Props) => ({ ...pre, isCurrentPage: false }));
        this.render();
      }
    });

    store.subscribe(State.HISTORIES, (histories) => {
      this.setState((pre: Props) => ({ ...pre, histories }));
      this.render();
    });

    store.subscribe(State.SEARCH_TERM, () => {
      this.render();
    });
  }
}

export default DetailPage;
