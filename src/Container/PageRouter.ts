import { useEffect, useState } from '../_Factory/App';
import { Div, render } from '../_Factory/Element';

import Header from '../Components/Header';
import Contents from '../Components/Contents';
import DetailContents from '../Components/DetailContents';

import filterHistory from '../utils/filterHistory';
import { history } from '../types';
import './PageContainer.scss';

interface MainPageProps {
  range: string;
  searchTerm: string;
  removedUrls: string[];
  setRemovedUrls: (val: string[]) => void;
  histories: history[];
}

function MainPage({ range, searchTerm, removedUrls, setRemovedUrls, histories }: MainPageProps): render {
  const filteredHistories = filterHistory(histories, {
    range: Number(range),
    searchTerm,
    removedUrls,
  });

  const handleRemoveUrls = (val: string) => {
    setRemovedUrls([...removedUrls, val]);
  };

  return render(
    Contents({ histories: filteredHistories, setRemovedUrls: handleRemoveUrls })(),
  );
}

function LikedPage({ likedItems }: { likedItems: history[] }): render {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return render(
    DetailContents({ title: 'Liked', histories: likedItems })(),
  );
}

function PageRouter(): render {
  const initialHistories: history[] = [];
  const [histories, setHistories] = useState(initialHistories);
  const [likedItems, setLikedItems] = useState([]);
  const [range, setRange] = useState('7');
  const [searchTerm, setSearchTerm] = useState('');
  const [removedUrls, setRemovedUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState('Main');

  function handleChangeMenu(page: string) {
    setCurrentPage(page);
  }

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
        Header({ range, setRange, setSearchTerm, changeMenu: handleChangeMenu, setRemovedUrls })(),
        MainPage({ range, searchTerm, removedUrls, setRemovedUrls, histories })()
      )
    );
  } else if (currentPage === 'Liked') {
    return render(
      Div()(
        Header({ range, setRange, setSearchTerm, changeMenu: handleChangeMenu, setRemovedUrls })(),
        LikedPage({ likedItems })()
      )
    );
  }
}

export default PageRouter;
