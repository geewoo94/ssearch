import simpleShadowDom from '../_Factory/simpleShadowDom.js';
import store, {
  SEARCH_TERM,
  RANGE_VALUE,
  PAGES,
  CURRENT_PAGE,
  initialSetting,
} from '../_Factory/shadowStore';

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
      <p>1 ⏐ 3 ⏐ 5 ⏐ 7</p>
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
      store.setItem(SEARCH_TERM, (e.target as HTMLInputElement).value);
      return;
    }

    if ((e.target as HTMLInputElement).classList.contains('Range-Input')) {
      store.setItem(RANGE_VALUE, (e.target as HTMLInputElement).value);
      return;
    }
  }

  headerClickEvent(e: Event) {
    if ((e.target as HTMLLIElement).tagName === 'LI') {
      window.scrollTo({ top: 0 });
      store.setItem(CURRENT_PAGE, (e.target as HTMLInputElement).textContent);
      return;
    }

    if ((e.target as HTMLImageElement).tagName === 'IMG') {
      window.scrollTo({ top: 0 });
      initialSetting();
      return;
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('input', this.headerInputEvent.bind(this));
    this.shadowRoot.addEventListener('click', this.headerClickEvent.bind(this));
  }
}

export default Header;
