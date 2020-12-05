import { useEffect, useState } from '../_Factory/App';
import { Div, render } from '../_Factory/Element';

import Header from '../Components/Header';
import Contents from '../Components/Contents';

import filterHistory from '../utils/filterHistory';
import { history } from '../types';
import './PageContainer.scss';

function MainPage({ histories }: { histories: history[] }): render {
  const [ range, setRange ] = useState('7');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ removedUrls, setRemovedUrls ] = useState([]);
  console.log(removedUrls);
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

function PageContainer({ page }: { page: string }): render {
  const initialHistories: history[] = [];
  const [histories, setHistories] = useState(initialHistories);

  useEffect(() => {
    //dev
    (async () => {
      const histories = await fetch('./mockHistory.json');
      const parsed = await histories.json();

      setHistories(parsed);
    })();

    //deploy
  }, []);

  const Page = MainPage;

  if (page === 'Main') {
    return render(MainPage({
      histories
    })());
  } else if (page === 'Liked') {
    return render(
      Div()('Liked')
    );
  }
}

export default PageContainer;
