import { Button, Div, H1, Input, Li, render, Ul } from '../_Factory/Element';

import { history } from '../types';
import './Contents.scss';

function SiteCard({ sites, setRemovedUrls }: {
  sites: history[],
  setRemovedUrls: (val: string) => void,
}) {
  const origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');

  return render(
    Div({ class: 'SiteCard-Wrapper' })(
      Button({
        class: 'Close-Button',
        event: {
          type: 'click',
          callback: () => setRemovedUrls(origin),
        }
      })('X'),
      H1()(origin),
      Input()(),
      Ul()(
        ...sites.map((site) => Li()(site.title.slice(0, 50) + '...' + '[미리보기]'))
      )
    )
  );
}

function Contents({ histories, setRemovedUrls }:{
  histories: history[][],
  setRemovedUrls: (val: string) => void,
}): render {
  return render(
    Div({ class: 'Contents-Wrapper' })(
      ...histories.map((history) => SiteCard({
        sites: history.slice(0, 10),
        setRemovedUrls,
      })())
    )
  );
}

export default Contents;
