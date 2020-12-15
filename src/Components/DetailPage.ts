import simpleShadowDom from 'simple-shadow-dom';
import { PAGES, State } from '../lib';

import store from '../store';
import { history } from '../types';
import { filterDetail } from '../utils/filterHistory';
import { includes } from '../utils/functianal';
import style from './DetailPage.style';

type Props = { histories: history[], currentPage: string, isCurrentPage: boolean };

const template = ({ histories, currentPage, isCurrentPage}: Props) => {
  const filteredHistories = filterDetail(histories, { currentPage })[0] || [];
  const origin = filteredHistories[0]?.origin.replace(/(^\w+:|^)\/\//, '');
  const filteredOrigin = origin?.replace(/www./, '').replace(/.com/, '');

  return (`
    <div class='DetailContents-Wrapper ${isCurrentPage ? '' : 'hide'}'>
      <h1>${filteredOrigin}</h1>
      <div>
        <ul>
          ${filteredHistories.map((history) => {
            return (`
              <li>
                <div>
                  <img src=${chrome.runtime ? `chrome://favicon/https://${origin}` : './main-icon16.png'} class='Image-Save' data-url=${history.url}></img>
                  <p>10분전</p>
                </div>
                <div>
                  <a href=${history.url} target='_blank' title=${history.url}>${history.title}</a>
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
        this.setState((pre: Props) => ({ ...pre, currentPage, isCurrentPage: true }));
        this.render();
      } else {
        this.setState((pre: Props) => ({ ...pre, isCurrentPage: false }));
        this.render();
      }
    });

    store.subscribe(State.HISTORIES, (histories: history[]) => {
      this.setState((pre: Props) => ({ ...pre, histories }));
      this.render();
    });
  }
}

export default DetailPage;
