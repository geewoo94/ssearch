import { A, Div, H1, Li, render, Ul } from '../_Factory/Element';

import { history } from '../types';
import './DetailContents.scss';
import { filterDetail } from '../utils/filterHistory';

function DetailContents({ currentPage, histories }: { currentPage?: string, histories?: history[] }): render {
  const filteredHistories = filterDetail(histories, { currentPage });

  return render(
    Div({ class: 'DetailContents-Wrapper' })(
      H1()(currentPage),
      Div()(
        Ul()(
          ...filteredHistories[0].map((history) => {
            return Li()(
              A({
                href: history.url,
                target: '_blank',
                title: history.url,
              })(history.title)
            );
          })
        )
      ),
    )
  );
}

export default DetailContents;
