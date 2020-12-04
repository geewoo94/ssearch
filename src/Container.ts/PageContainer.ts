import { useEffect, useState } from '../_Factory/App';
import { Div, render } from '../_Factory/Element';

import Header from '../Components/Header';
import Contents from '../Components/Contents';

import { history } from '../types';
import './PageContainer.scss';

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
    Div({ class: 'PageContainer-wrapper' })(
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
    return render(MainPage({
      histories
    })());
  } else if (page === 'Liked') {
    return render(
      Div()('Liked')
    );
  }
};

export default PageContainer;
