import { A, Div, H1, Li, render, Ul } from '../_Factory/Element';

import { history } from '../types';

function LikedPage({ likedItems }: { likedItems: history[] }) {
  likedItems.sort((a, b) => {
    return b.count - a.count;
  });

  const handleCountUp = (url: string) => {
    chrome.storage.sync.get(({ likedItems }) => {
      likedItems = likedItems.map((item: history) => {
        if (item.url === url) {
          item.count += 1;
          return item;
        } else {
          return item;
        }
      });

      chrome.storage.sync.set({ likedItems });
    });
  };

  return render(
    Div({ class: 'DetailContents-Wrapper' })(
      H1()('Liked'),
      Div()(
        Ul()(
          ...likedItems.map((item) => {
            return Li()(
              A({
                style: `font-size: ${item.count + 10}px;`,
                href: item.url,
                target: '_blank',
                title: item.url,
                event: {
                  type: 'click',
                  callback: () => handleCountUp(item.url),
                }
              })(item.count + ' 번 검색한' + ' ' +item.title)
            );
          })
        )
      ),
    )
  );
}

export default LikedPage;
