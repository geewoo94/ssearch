import * as Toastify from 'toastify-js';

type Props = { text: string, backgroundColor: string };

export default ({ text, backgroundColor }: Props) => {
  Toastify({
    text,
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor,
    stopOnFocus: false,
  }).showToast();
};
