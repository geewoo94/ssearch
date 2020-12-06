import { Div, H1, Li, render, Ul } from '../_Factory/Element';

import { history } from '../types';
import './DetailContents.scss';

function DetailContents({ title, histories }: { title: string, histories: history[] }): render {
  return render(
    Div({ class: 'DetailContents-Wrapper' })(
      H1()(title),
      Div()(
        Ul()(
          ...histories.map((history) => {
            return Li()(history.title);
          })
        )
      ),
    )
  );
}

export default DetailContents;
