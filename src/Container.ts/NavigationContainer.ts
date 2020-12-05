import { Div, H1, H2, Li, Nav, Ul } from '../_Factory/Element';
import { render } from '../_Factory/Element';

import './NavigationContainer.scss';

function NavigationContainer({ changeMenu }: { changeMenu: (page: string) => void }): render {
  const navMenu = ['Main', 'Liked'];

  const handleClick = (value: string) => {
    changeMenu(value);
  };

  return render(
    Div({ class: 'NavigationContainer-Wrapper' })(
      H1()('Navigation'),
      Nav()(
        Ul()(
          ...navMenu.map((menu) => Li({
            event: {
              type: 'click',
              callback: (ev: Event) => handleClick((ev.target as HTMLElement).textContent),
            }
          })(menu))
        )
      ),
      H2()('Options'),
    ),
  );
}

export default NavigationContainer;
