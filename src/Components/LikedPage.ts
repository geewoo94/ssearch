import { A, Div, H1, Li, render, Ul } from '../_Factory/Element';

import { history } from '../types';

function LikedPage({ likedItems }: { likedItems: history[] }) {
  return render(
    Div({ class: 'DetailContents-Wrapper' })(
      H1()('Liked'),
      Div()(
        Ul()(
          ...likedItems.map((item) => {
            return Li()(
              A({
                href: item.url,
                target: '_blank',
                title: item.url,
              })(item.title)
            );
          })
        )
      ),
    )
  );
}

export default LikedPage;
