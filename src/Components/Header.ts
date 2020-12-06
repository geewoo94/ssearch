import { Div, Img, Input, Li, Nav, render, Ul } from '../_Factory/Element';

import './Header.scss';

type HeaderProps = {
  range?: string,
  setRange?: (val: string) => void,
  searchTerm?: string,
  setSearchTerm?: (val: string) => void,
  changeMenu?: (val: string) => void,
};

function Header({ range, setRange, setSearchTerm, changeMenu }: HeaderProps): render {
  const navMenu = ['Main', 'Liked'];

  return render(
    Div({ class: 'Header-Wrapper' })(
      Nav()(
        Ul()(
          ...navMenu.map((menu) => Li({
            event: {
              type: 'click',
              callback: (ev: Event) => changeMenu((ev.target as HTMLElement).textContent),
            }
          })(menu))
        )
      ),
      Div({ class: 'Header-Column' })(
        Img({ src: './main-icon-128.png' })(),
        Input({
          class: 'Search-Input',
          placeholder: '검색을 껌색하세요!',
          event: {
            type: 'change',
            callback: (ev: Event) => setSearchTerm((ev.target as HTMLInputElement).value)
          }
        })(),
      ),
      Input({
        type: 'range',
        min: '0',
        max: '7',
        value: range,
        class: 'Range-Input',
        event: {
          type: 'change',
          callback: (ev: Event) => setRange((ev.target as HTMLInputElement).value),
        }
      })(),
    )
  );
}

export default Header;
