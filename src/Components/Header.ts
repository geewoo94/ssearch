import simpleShadowDom from 'simple-shadow-dom';
import { PAGES, State } from '../lib';
import store, { initialSetting } from '../store';

import style from './Header.style';

const template =  `
  <div class='Header-Wrapper'>
    <nav>
      <ul>
        <li>${PAGES.main}</li>
        <li>${PAGES.liked}</li>
        <li>${PAGES.previews}</li>
      </ul>
    </nav>
    <div class='Header-column'>
      <img src='./main-icon-128.png' />
      <input class='Search-Input' placeholder='검색을 껌색하세요!'></input>
    </div>
    <div>
      <input type='range' min='1' max='7' value='7' class='Range-Input'></input>
      <p><b>1</b><b>⏐</b><b>3</b><b>⏐</b><b>5</b><b>⏐</b><b>7</b></p>
    </div>
  </div>
`;

class Header extends simpleShadowDom {
  constructor() {
    super();

    this.setStyle(style);
    this.setTemplate(template);
    this.render();
  }

  headerInputEvent(e: Event) {
    if ((e.target as HTMLInputElement).classList.contains('Search-Input')) {
      store.setItem(State.SEARCH_TERM, (e.target as HTMLInputElement).value);
      return;
    }

    if ((e.target as HTMLInputElement).classList.contains('Range-Input')) {
      store.setItem(State.RANGE_VALUE, (e.target as HTMLInputElement).value);
      return;
    }
  }

  headerClickEvent(e: Event) {
    if ((e.target as HTMLLIElement).tagName === 'LI') {
      window.scrollTo({ top: 0 });
      store.setItem(State.CURRENT_PAGE, (e.target as HTMLInputElement).textContent);
      return;
    }

    if ((e.target as HTMLImageElement).tagName === 'IMG') {
      window.scrollTo({ top: 0 });
      initialSetting();
      return;
    }
  }

  headerScrollEvent() {
    if (window.scrollY >= 10) {
      const header = this.shadowRoot.querySelector('.Header-Wrapper');
      header.setAttribute('style', 'height: 70px; background: #1C3035;');
      [...header.querySelectorAll('li')].forEach((el) => {
        el.setAttribute('style', 'color: yellow;');
      });
      header.querySelector('img').classList.add('hide');
      header.querySelector('p').setAttribute('style', 'display: none;');
      header.querySelector('input[type=range]').setAttribute('style', '-webkit-background: yellow;');
    } else {
      const header = this.shadowRoot.querySelector('.Header-Wrapper');
      header.removeAttribute('style');
      [...header.querySelectorAll('li')].forEach((el) => {
        el.removeAttribute('style');
      });
      header.querySelector('img').classList.remove('hide');
      header.querySelector('p').removeAttribute('style');
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('input', this.headerInputEvent.bind(this));
    this.shadowRoot.addEventListener('click', this.headerClickEvent.bind(this));

    window.addEventListener('scroll', this.headerScrollEvent.bind(this));
  }
}

export default Header;
