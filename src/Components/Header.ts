import { Div, Img, Input, render } from '../_Factory/Element';

import './Header.scss';

function Header({ range, setRange }: { range: string, setRange: (val: string) => void }): render {
  return render(
    Div({ class: 'Header-Wrapper' })(
      Div({ class: 'Right-Column' })(),
      Div({ class: 'Header-Column' })(
        Img({ src: './main-icon-128.png' })(),
        Input({ placeholder: '검색을 껌색하세요!', class: 'Search-Input' })(),
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
