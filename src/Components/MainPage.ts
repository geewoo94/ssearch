import { render } from '../_Factory/Element';
import { useDispatch, useSelector } from '../_Factory/Store';

import Contents from './Contents';
import { history } from '../types';
import { filterHistory } from '../utils/filterHistory';
import { useEffect, useState } from '../_Factory/App';
import { setScrollPage } from '../store';

let hasScroll = false;

function MainPage({ histories }: { histories: history[] }) {
  const {
    range,
    searchTerm,
    removedUrls,
    scrollPage,
  } = useSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasScroll) return;

    hasScroll = true;

    function addPage() {
      if (
        document.documentElement.scrollTop +
        document.documentElement.clientHeight === document.documentElement.scrollHeight
      ) {
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
