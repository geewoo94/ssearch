import { useEffect } from '../_Factory/App';
import { useDispatch, useSelector } from '../_Factory/Store';
import { A, Div, H1, Li, render, Ul } from '../_Factory/Element';

import DetailContents from '../Components/DetailContents';
import MainPage from '../Components/MainPage';
import LikedPage from '../Components/LikedPage';

import { setHistories, setLikedItems } from '../store';
import {
  MAIN_PAGE,
  LIKED_PAGE,
} from '../constants';
import './PageContainer.scss';

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
