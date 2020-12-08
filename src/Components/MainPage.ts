import { render } from '../_Factory/Element';
import { useSelector } from '../_Factory/Store';

import Contents from './Contents';
import { history } from '../types';
import { filterHistory } from '../utils/filterHistory';

function MainPage({ histories }: { histories: history[] }) {
  const {
    range,
    searchTerm,
    removedUrls
  } = useSelector();

  const filteredHistories = filterHistory(histories, {
    range: Number(range),
    searchTerm,
    removedUrls,
  });

  return render(
    Contents({ histories: filteredHistories })(),
  );
}

export default MainPage;
