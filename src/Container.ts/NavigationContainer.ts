import { Div, H1, H2, Li, Nav, Ul } from '../_Factory/Element';
import { render } from '../_Factory/Element';

function NavigationContainer({ changeMenu }: { changeMenu: Function }): Function {
  const navMenu = ['Main', 'Liked'];

  const handleClick = (value: string) => {
    changeMenu(value);
  }

  return render(
    Div()(
      H1()('Navigation'),
      Nav()(
        Ul()(
          ...navMenu.map((menu) => Li({
            onClick: (ev: any) => handleClick(ev.target.textContent),
          })(menu))
        )
      ),
      H2()('Options'),
    ),
  );
};

export default NavigationContainer;
