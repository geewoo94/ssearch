import { Div, Img, Input, render } from "../_Factory/Element";

import styled from '../utils/styled';
import './Header.scss';

const styledDiv = styled(Div);
const style = `
  display: flex;
  justify-content: space-around;
  width: 100vh;
`;

function Header({ range, setRange }: { range: string, setRange: Function }): Function {
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
        onChange: (ev: any) => setRange(ev.target.value),
      })(),
    )
  );
}

export default Header;
