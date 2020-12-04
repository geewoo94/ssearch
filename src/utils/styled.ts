export default (function() {
  const memo: { [key: string]: boolean } = {};
  const styleTag = document.createElement('style');
  const head = document.querySelector('head');

  function generateRandomString() {
    return (
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
    )
  }

  function styled(el: Function) {
    const randomClass = generateRandomString();

    return function (style: string, options?: { [key: string]: string | Function }) {
      const text = `.${randomClass} {${style}}`;

      if (!memo[text]) {
        memo[text] = true;
        styleTag.textContent += text;
      }

      head.appendChild(styleTag);

      return el(Object.assign({ class: randomClass }, options));
    }
  }

  return styled;
})();
