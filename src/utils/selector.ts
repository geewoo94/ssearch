interface Interface$ {
  append: (el: Element) => Interface$;
  add: (tagName: string) => Interface$;
  define: (tagName: string, shadow: any) => Interface$
}

export default function (sel: string) {
  const element = document.querySelector(sel);
  const $: Interface$ = {
    append: null,
    add: null,
    define: null,
  };

  $.append = (el) => (element.appendChild(el), $);

  $.add = (tagName) => ($.append(document.createElement(tagName)), $);

  $.define = (tagName, shadow) => (customElements.define(tagName, shadow), $);

  return $;
}
