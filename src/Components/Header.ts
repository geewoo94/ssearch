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
      Img({ src: './main-icon-128.png' })(),
      Input({ value: '검색!' })(),
      Input({
        type: 'range',
        min: '0',
        max: '7',
        value: range,
        onChange: (ev: any) => setRange(ev.target.value),
      })(),
    )
  );
}

export default Header;
