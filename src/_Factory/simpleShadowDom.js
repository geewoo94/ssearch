import { get, set, curryRight, startsWith } from 'lodash';
import flatten from 'css-flatten';


//utils
const minify = (css) =>
  css.trim().replace(/\s*(;|,|{|})\s*/g, '$1');

const reduce = (fn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = fn(acc, a);
  }

  return acc;
};

const go = (arg, ...fn) => reduce((acc, fn) => fn(acc), arg, fn);

const curry = (fn) => (...arg) =>
  (arg.length >= fn.length) ? fn(...arg) : curry(fn.bind(null, ...arg));

const pipe = (...fns) => (arg) => go(arg, ...fns);

const minifyFlatten = pipe(flatten, minify);

const setInnerHTML = curry((el, template) =>
  ((el.innerHTML = template), el));

const setTextContent = curry((el, text) =>
  ((el.textContent = text), el));

const createTemplate = curry((template, state) =>
  (typeof template === 'function') ? template(state) : template);

const makeEl = (template) =>
  setInnerHTML(document.createElement('div'), template).children[0];

const createEl = (type) =>
  document.createElement(type);

const append = curry((parent, child) =>
  parent.appendChild(child));

const remove = curry((parent, child) =>
  parent.removeChild(child));

const each = curry((fn, iter) => {
  for (const a of iter) {
    fn(a);
  }
});

const matchTagName = (markup) => {
  const pattern = /<([^\s>]+)(\s|>)+/;
  return markup.match(pattern)[1];
};

//utils

const state = {};
const subscriber = {};

export default class TinyComponent extends HTMLElement {
  static render(root, shadowClass, tagName) {
    if (startsWith(tagName, '<')) {
      go(makeEl(tagName),
        append(root));
      customElements.define(matchTagName(tagName), shadowClass);
    } else {
      go(createEl(tagName),
        append(root));
      customElements.define(tagName, shadowClass);
    }
  }

  static setEachStyle(css) {
    if (!css) return;
    TinyComponent._eachStyle = minifyFlatten(css);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._template = null;
    this._el = null;
    this._styleEl = null;
    this._state = null;
    this._isRendered = false;
  }

  setTemplate(template) {
    this._template = template;
  }

  _setStyleEl(style) {
    this._styleEl = style;
  }

  setStyle(css) {
    const eachStyle = TinyComponent._eachStyle || '';

    go(minifyFlatten(css + eachStyle),
      setTextContent(createEl('style')),
      append(this.shadowRoot));
  }

  setState(state) {
    this._state = (typeof state === 'function') ? state(this._state) : state;
    if (this._state === undefined) throw Error('Can not set undefined');
  }

  _setEl(el) {
    this._el = el;
    this._isRendered = true;
  }

  _render() {
    go(createTemplate(this._template, this._state),
      makeEl,
      append(this.shadowRoot),
      this._setEl.bind(this));
  }

  render() {
    (this._isRendered) ?
      (remove(this.shadowRoot, this._el), this._render.bind(this)()) :
      this._render.bind(this)();
  }

  getState(path) {
    return get(state, path);
  }

  subscribe(path, callback) {
    if (!get(subscriber, path)) set(subscriber, path, []);
    const subscribers = get(subscriber, path);
    set(subscriber, path, [...subscribers, callback]);
  }

  reRender(template, props) {
    template = this.template;

    const { content } = createTemplate(template, props);
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}
