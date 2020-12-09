import { Div, Img, render } from '../_Factory/Element';
import { useSelector } from '../_Factory/Store';

import './PreviewPage.scss';

function PreviewPage() {
  const previews = useSelector((state) => state.previews);

  const openModal = ({ url, base64 }: { url: string, base64: string }) => {
    const $modal = document.querySelector('#modal');
    const $moveTag = document.querySelector('.container a');
    const $img = document.createElement('img');

    $img.src = base64;

    $modal.classList.remove('close');
    $modal.appendChild($img);
    ($moveTag as HTMLAnchorElement).href = url;

    const closeModal = () => {
      $modal.classList.add('close');
      $modal.removeChild($img);
      $modal.removeEventListener('click', closeModal);
    };

    $modal.addEventListener('click', closeModal);
  };

  return render(
    Div({
      class: 'Preview-Page-Wrapper',
    })(
      ...previews.map((item: { url: string, base64: string }) => {
        const base64 = `data:image/png;base64, ${item.base64}`;

        return Img({
          src: base64,
          event: {
            type: 'click',
            callback: () => openModal({ url: item.url, base64 }),
          }
        })();
      })
    )
  );
}

export default PreviewPage;
