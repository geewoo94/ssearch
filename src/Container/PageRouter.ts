import { useEffect, useState } from '../_Factory/App';
import { A, Div, H1, Li, render, Ul } from '../_Factory/Element';

import Header from '../Components/Header';
import Contents from '../Components/Contents';
import DetailContents from '../Components/DetailContents';

import { filterHistory } from '../utils/filterHistory';
import { history } from '../types';
import './PageContainer.scss';

type MainPageProps = {
  range: string;
  searchTerm: string;
  removedUrls: string[];
  setCurrentPage: (val: string) => void,
  setRemovedUrls: (val: string[]) => void;
  histories: history[];
}
function MainPage({ range, searchTerm, removedUrls, setCurrentPage, setRemovedUrls, histories }: MainPageProps): render {
  const filteredHistories = filterHistory(histories, {
    range: Number(range),
    searchTerm,
    removedUrls,
  });

  const handleRemoveUrls = (val: string) => {
    setRemovedUrls([...removedUrls, val]);
  };

  return render(
    Contents({ histories: filteredHistories, setCurrentPage, setRemovedUrls: handleRemoveUrls })(),
  );
}

type LikedPageProps = { likedItems: history[] };
function LikedPage({ likedItems }: LikedPageProps): render {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

function PageRouter(): render {
  const initialHistories: history[] = [];
  const initialLikedItems: { url: string, title: string }[] = [];
  const initialRemovedItems: string[] = [];
  const [histories, setHistories] = useState(initialHistories);
  const [likedItems, setLikedItems] = useState(initialLikedItems);
  const [removedUrls, setRemovedUrls] = useState(initialRemovedItems);
  const [range, setRange] = useState('7');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('Main');

  useEffect(() => {
    if (!chrome.history) {
      (async () => {
        const histories = await fetch('./mockHistory.json');
        const parsed = await histories.json();

        setHistories(parsed);
        setLikedItems([
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
          { title: 'mocktitle', url: 'https://www.google.com' },
        ]);
      })();
    } else {
      const query = { text: '', maxResults: 0, startTime: (new Date()).getTime() - (7 * 24 * 3600 * 1000), endTime: (new Date()).getTime() };
      chrome.history.search(query, (history) => {
        setHistories(history);
      });
      chrome.storage.sync.get(({ likedItems }) => {
        setLikedItems(likedItems);
      });
    }
  }, []);

  if (currentPage === 'Main') {
    return render(
      Div()(
        Header({ range, setRange, setSearchTerm, changeMenu: setCurrentPage, setRemovedUrls })(),
        MainPage({ range, searchTerm, removedUrls, setCurrentPage, setRemovedUrls, histories })()
      )
    );
  } else if (currentPage === 'Liked') {
    return render(
      Div()(
        Header({ range, setRange, setSearchTerm, changeMenu: setCurrentPage, setRemovedUrls })(),
        LikedPage({ likedItems })()
      )
    );
  } else {
    return render(
      Div()(
        Header({ range, setRange, setSearchTerm, changeMenu: setCurrentPage, setRemovedUrls })(),
        DetailContents({ currentPage, histories })()
      )
    );
  }
}

export default PageRouter;
