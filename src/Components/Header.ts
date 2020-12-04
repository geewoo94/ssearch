import { Div, Img, Input, render } from "../_Factory/Element";

function Header({ range, setRange }: { range: string, setRange: Function }): Function {
  return render(
    Div()(
      Img({ src: './main-icon-128.png' })(),
      Input({ value: 'testValue' })(),
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
