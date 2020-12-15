import simpleShadowDom from 'simple-shadow-dom';
import { PAGES, State } from '../lib';
import store from '../store';

import style from './PreviewPage.style';

type Props = { list: { base64: string, url: string }[], isCurrentPage: boolean };

const template = ({ list, isCurrentPage }: Props) => {
  return (`
    <div class='Preview-Page-Wrapper ${isCurrentPage ? '' : 'hide'}'>
      ${list.map((item) => {
        return (`
          <img src='data:image/png;base64, ${item.base64}' data-url=${item.url}></img>
        `);
      }).join('')}
    </div>
  `);
};

class PreviewPage extends simpleShadowDom {
  constructor() {
    super();

    this.setStyle(style);
    this.setState({ list: [], isCurrentPage: false });
    this.setTemplate(template);
    this.render();
  }

  previewClickEvent(e: Event) {
    const { src, dataset: { url }} = (e.target as HTMLImageElement);

    const $modal = document.querySelector('#modal');
    const $moveTag = document.querySelector('.container a');
    const $img = document.createElement('img');

    $img.src = src;

    $modal.classList.remove('hide');
    $modal.appendChild($img);
    ($moveTag as HTMLAnchorElement).href = url;

    const closeModal = () => {
      $modal.classList.add('hide');
      $modal.removeChild($img);
      $modal.removeEventListener('click', closeModal);
    };

    $modal.addEventListener('click', closeModal);
  }

  connectedCallback() {
    store.subscribe(State.CURRENT_PAGE, (page) => {
      if (page === PAGES.previews) {
        this.setState((prev: Props) => ({ ...prev, isCurrentPage: true }));
        this.render();
      } else {
        this.setState((prev: Props) => ({ ...prev, isCurrentPage: false }));
        this.render();
      }
    });

    store.subscribe(State.PREVIEWS, (previews) => {
      this.setState((prev: Props) => ({ ...prev, list: previews }));
      this.render();
    });

    this.shadowRoot.addEventListener('click', this.previewClickEvent.bind(this));
  }
}

export default PreviewPage;
