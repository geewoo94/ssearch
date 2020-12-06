import { useEffect, useState } from '../_Factory/App';
import { Div, render } from '../_Factory/Element';

import Header from '../Components/Header';
import Contents from '../Components/Contents';
import DetailContents from '../Components/DetailContents';

import filterHistory from '../utils/filterHistory';
import { history } from '../types';
import './PageContainer.scss';

function MainPage({ histories }: { histories: history[] }): render {
  const [range, setRange] = useState('7');
  const [searchTerm, setSearchTerm] = useState('');
  const [removedUrls, setRemovedUrls] = useState([]);

  const filteredHistories = filterHistory(histories, {
    range: Number(range),
    searchTerm,
    removedUrls,
  });

  const handleRemoveUrls = (val: string) => {
    setRemovedUrls([...removedUrls, val]);
  };

  return render(
    Div({ class: 'PageContainer-wrapper' })(
      Header({ range, setRange, searchTerm, setSearchTerm })(),
      Contents({ histories: filteredHistories, setRemovedUrls: handleRemoveUrls })(),
    )
  );
}

function LikedPage({ likedItems }: { likedItems: history[] }): render {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emptyFunction = () => {};

  return render(
    Div({ class: 'PageContainer-wrapper' })(
      Header({
        range: '6', setRange: emptyFunction, searchTerm: '', setSearchTerm: emptyFunction })(),
      DetailContents({ title: 'Liked', histories: likedItems })(),
    )
  );
}

function PageRouter({ page }: { page: string }): render {
  const initialHistories: history[] = [];
  const [histories, setHistories] = useState(initialHistories);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    if (!chrome.history) {
      (async () => {
        const histories = await fetch('./mockHistory.json');
        const parsed = await histories.json();

        setHistories(parsed);
        setLikedItems([{ title: 'mocktitle', url: 'https://www.google.com' }]);
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

  if (page === 'Main') {
    return render(MainPage({
      histories
    })());
  } else if (page === 'Liked') {
    return render(LikedPage({
      likedItems,
    })());
  }
}

export default PageRouter;
