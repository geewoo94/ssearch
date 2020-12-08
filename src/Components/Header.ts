import { Div, Img, Input, Li, Nav, render, Ul } from '../_Factory/Element';
import { useDispatch } from '../_Factory/Store';

import {
  setRange,
  setRemovedUrls,
  setSearchTerm,
  setCurrentPage,
} from '../store';
import {
  PAGES,
  DEFAULT_PAGE,
  DEFAULT_RANGE,
} from '../constants';
import './Header.scss';

function Header(): render {
  const navMenu = PAGES;
  const dispatch = useDispatch();

  const handleSetSearchTerm = (val: string) => {
    dispatch(setSearchTerm(val));
  };

  const handleSetRange = (val: string) => {
    dispatch(setRange(val));
  };

  const handleSetCurrentPage = (val: string) => {
    dispatch(setCurrentPage(val));
  };

  const handleReset = () => {
    dispatch(setRange(DEFAULT_RANGE));
    dispatch(setSearchTerm(''));
    dispatch(setCurrentPage(DEFAULT_PAGE));
    dispatch(setRemovedUrls([]));
  };

  return render(
    Div({ class: 'Header-Wrapper' })(
      Nav()(
        Ul()(
          ...navMenu.map((currentPage) => Li({
            event: {
              type: 'click',
              callback: (ev: Event) => handleSetCurrentPage((ev.target as HTMLElement).textContent),
            }
          })(currentPage))
        )
      ),
      Div({ class: 'Header-Column' })(
        Img({
          src: './main-icon-128.png',
          event: {
            type: 'click',
            callback: handleReset,
          }
        })(),
        Input({
          class: 'Search-Input',
          placeholder: '검색을 껌색하세요!',
          event: {
            type: 'input',
            callback: (ev: Event) => handleSetSearchTerm((ev.target as HTMLInputElement).value)
          }
        })(),
      ),
      Input({
        type: 'range',
        min: '0',
        max: '7',
        class: 'Range-Input',
        event: {
          type: 'input',
          callback: (ev: Event) => handleSetRange((ev.target as HTMLInputElement).value),
        }
      })(),
    )
  );
}

export default Header;
