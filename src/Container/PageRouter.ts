import { useEffect } from '../_Factory/App';
import { useDispatch, useSelector } from '../_Factory/Store';
import { A, Div, H1, Li, render, Ul } from '../_Factory/Element';

import Contents from '../Components/Contents';
import DetailContents from '../Components/DetailContents';

import { history } from '../types';
import { filterHistory } from '../utils/filterHistory';
import { setHistories, setLikedItems } from '../store';
import {
  MAIN_PAGE,
  LIKED_PAGE,
} from '../constants';
import './PageContainer.scss';

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

function LikedPage({ likedItems }: { likedItems: history[] }) {
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
  const { histories, likedItems, currentPage } = useSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    const WEEK_BY_MILLISECOND = (7 * 24 * 3600 * 1000);
    const query = {
      text: '',
      maxResults: 0,
      startTime: (new Date()).getTime() - WEEK_BY_MILLISECOND,
      endTime: (new Date()).getTime()
    };

    chrome.history.search(query, (history) => {
      dispatch(setHistories(history));
    });
    chrome.storage.sync.get(({ likedItems }) => {
      dispatch(setLikedItems(likedItems));
    });
  }, []);

  if (currentPage === MAIN_PAGE) {
    return render(
      Div()(
        MainPage({ histories })()
      )
    );
  } else if (currentPage === LIKED_PAGE) {
    return render(
      Div()(
        LikedPage({ likedItems })()
      )
    );
  } else {
    return render(
      Div()(
        DetailContents({ currentPage, histories })()
      )
    );
  }
}

export default PageRouter;
