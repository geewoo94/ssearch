import { render } from '../_Factory/Element';
import { useDispatch, useSelector } from '../_Factory/Store';

import Contents from './Contents';
import { history } from '../types';
import { filterHistory } from '../utils/filterHistory';
import { useEffect, useState } from '../_Factory/App';
import { setScrollPage } from '../store';

function MainPage({ histories }: { histories: history[] }) {
  const {
    range,
    searchTerm,
    removedUrls,
    scrollPage,
  } = useSelector();
  const dispatch = useDispatch();
  const [ hasScroll, setHasScroll ] = useState(false);

  useEffect(() => {
    if (hasScroll) return;

    setHasScroll(true);

    function addPage() {
      const {
        scrollTop,
        clientHeight,
        scrollHeight,
      } = document.documentElement;
      if ((scrollTop + clientHeight) === scrollHeight) {
        const scrollPage = useSelector((state) => state.scrollPage);
        dispatch(setScrollPage(scrollPage + 1));
      }
    }

    window.addEventListener('scroll', addPage);
  }, []);

  const filteredHistories = filterHistory(histories, {
    range: Number(range),
    searchTerm,
    removedUrls,
  });

  return render(
    Contents({ histories: filteredHistories.slice(0, 4 * scrollPage) })(),
  );
}

export default MainPage;
