import TinyComponent from '../_Factory/ShadowComponent.js';

import {
  setRange,
  setRemovedUrls,
  setSearchTerm,
  setCurrentPage,
  setScrollPage,
} from '../store';
import {
  PAGES,
  DEFAULT_PAGE,
  DEFAULT_RANGE,
} from '../constants';
import './Header.scss';

import style from './ShadowHeader.style';

// function Header(): render {
//   const navMenu = PAGES;
//   const dispatch = useDispatch();

//   const handleSetSearchTerm = (val: string) => {
//     dispatch(setSearchTerm(val));
//   };

//   const handleSetRange = (val: string) => {
//     dispatch(setRange(val));
//   };

//   const handleSetCurrentPage = (val: string) => {
//     dispatch(setCurrentPage(val));
//   };

//   const handleReset = () => {
//     window.scrollTo({ top: 0 });
//     dispatch(setRange(DEFAULT_RANGE));
//     dispatch(setSearchTerm(''));
//     dispatch(setCurrentPage(DEFAULT_PAGE));
//     dispatch(setRemovedUrls([]));
//     dispatch(setScrollPage(1));
//   };

//   return render(
//     Div({ class: 'Header-Wrapper' })(
//       Nav()(
//         Ul()(
//           ...navMenu.map((currentPage) => Li({
//             event: {
//               type: 'click',
//               callback: (ev: Event) => handleSetCurrentPage((ev.target as HTMLElement).textContent),
//             }
//           })(currentPage))
//         )
//       ),
//       Div({ class: 'Header-Column' })(
//         Img({
//           src: './main-icon-128.png',
//           event: {
//             type: 'click',
//             callback: handleReset,
//           }
//         })(),
//         Input({
//           class: 'Search-Input',
//           placeholder: '검색을 껌색하세요!',
//           event: {
//             type: 'input',
//             callback: (ev: Event) => handleSetSearchTerm((ev.target as HTMLInputElement).value)
//           }
//         })(),
//       ),
//       Div()(
//         Input({
//           type: 'range',
//           min: '1',
//           max: '7',
//           class: 'Range-Input',
//           event: {
//             type: 'input',
//             callback: (ev: Event) => handleSetRange((ev.target as HTMLInputElement).value),
//           }
//         })(),
//         P()('1 ⏐ 3 ⏐ 5 ⏐ 7'),
//       )
//     )
//   );
// }
import { store } from '../_Factory/ShadowComponent';

const template =  `
  <div class='Header-Wrapper'>
    <nav>
      <ul>
        <li>Main</li>
        <li>Liked</li>
        <li>Preview</li>
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


export const SEARCH_TERM = 'header/searchTerm';
export const RANGE_VALUE = 'header/rangeValue';

class Header extends TinyComponent {
  constructor() {
    super();

    store.setState(SEARCH_TERM, '');
    store.setState(RANGE_VALUE, '7');

    this.setStyle(style);
    this.setTemplate(template);

    this.render();
  }

  headerInputEvent(e: Event) {
    if ((e.target as HTMLInputElement).classList.contains('Search-Input')) {
      console.log((e.target as HTMLInputElement).value);
      store.setState(SEARCH_TERM, (e.target as HTMLInputElement).value);
      return;
    }

    if ((e.target as HTMLInputElement).classList.contains('Range-Input')) {
      store.setState(RANGE_VALUE, (e.target as HTMLInputElement).value);
      return;
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('input', this.headerInputEvent.bind(this));
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('input', this.headerInputEvent.bind(this));
  }
}

export default Header;

//TODO: eventListener 개선
//global style 어떡할지 정하기.
