import simpleShadowDom from '../_Factory/simpleShadowDom.js';
import store, { PAGES, LIKED, CURRENT_PAGE } from '../_Factory/shadowStore';

import style from './LikedPage.style';

type LikedItem = { count: number, title: string, url: string };
type Props = { likedItems: LikedItem[], isCurrentPage: boolean };

const template = ({ likedItems, isCurrentPage }: Props) => {
  const list = likedItems.sort((a, b) => b.count - a.count);

  return (`
    <div class='LikedPage-Wrapper ${isCurrentPage ? '' : 'hide'}'>
      <h1>Liked</h1>
      <div>
        <ul>
          ${list.map((item) => {
            return (`
              <li>
                <a
                  class='Liked-Anchor'
                  style='font-size: ${item.count + 10}px;'
                  href=${item.url}
                  target='_blank'
                  title=${item.url}
                  data-url=${item.url}
                >
                  ${item.count} 번 검색한 ${item.title}
                </a>
              </li>
            `);
          }).join('')}
        </ul>
      </div>
    </div>
  `);
};

class LikedPage extends simpleShadowDom {
  constructor() {
    super();

    chrome.storage.sync.get(({ likedItems }) => {
      store.setItem(LIKED, likedItems);
    });

    this.setState({ likedItems: [], isCurrentPage: false });
    this.setStyle(style);
    this.setTemplate(template);
    this.render();
  }

  likedPAgeInputEvent(e: Event) {
    if ((e.target as HTMLAnchorElement).classList.contains('Liked-Anchor')) {
      const url = (e.target as HTMLAnchorElement).dataset.url;

      chrome.storage.sync.get(({ likedItems }) => {
        likedItems = likedItems.map((item: LikedItem) =>
          (item.url === url) ? ((item.count += 1), item) : item);

        chrome.storage.sync.set({ likedItems });
      });

      return;
    }
  }

  connectedCallback() {
    store.subscribe(CURRENT_PAGE, (page) => {
      if (page === PAGES.liked) {
        this.setState((prev: Props) => ({...prev, isCurrentPage: true}));
        this.render();
      } else {
        this.setState((prev: Props) => ({ ...prev, isCurrentPage: false }));
        this.render();
      }
    });

    store.subscribe(LIKED, (likedItems) => {
      this.setState((prev: Props) => ({ ...prev, likedItems }));
      this.render();
    });

    this.shadowRoot.addEventListener('click', this.likedPAgeInputEvent.bind(this));
  }
}

export default LikedPage;
