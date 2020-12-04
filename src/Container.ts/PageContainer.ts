import { useEffect, useState } from '../_Factory/App';
import { Div, render } from '../_Factory/Element';

import Header from '../Components/Header';
import Contents from '../Components/Contents';

import { history } from '../types';

function filterHistory(range: number, histories: history[]) {
  return histories.filter((history) => {
    const startTime = (new Date()).getTime() - (range * 24 * 3600 * 1000);

    return history.lastVisitTime >= startTime;
  });
}

function MainPage({ histories }: { histories: history[] }): Function {
  const [range, setRange] = useState('7');
  const filteredHistories = filterHistory(Number(range), histories);

  return render(
    Div()(
      Header({ range, setRange })(),
      Contents({ histories: filteredHistories })(),
    )
  );
}

const initialHistories: history[] = [];

function PageContainer({ page }: { page: string }): Function {
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

  let Page = MainPage;

  if (page === 'Main') {
    Page = MainPage;
  } else if (page === 'Liked') {
    // Page = LikedPage;
  }

  return render(Page({
    histories
  })());
};

export default PageContainer;
