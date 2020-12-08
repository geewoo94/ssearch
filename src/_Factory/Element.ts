export type renderChildren = Element[] | string[] | number[] | null[];
export type render = (...children: renderChildren) => Element

export function render(el: Element): render {
  return (function(...children: renderChildren): Element {
    if (typeof children[0] === 'string' || typeof children[0] === 'number') {
      this.innerHTML = String(children[0]);
      return this;
    }

    if (children[0] === null) return this;

    children.forEach((child) => {
      this.appendChild(child);
    });

    return this;
  }).bind(el);
}

type myEvent = {
  type: 'click' | 'change' | 'input' | 'submit';
  callback: (ev: Event) => void;
}

interface factoryOption {
  [key: string]: string | myEvent;
  event?: myEvent;
}

function elementFactory(type: string) {
  return function (options?: factoryOption) {
    const el = document.createElement(type);

    for (const key in options) {
      if (key === 'event') {
        const { type, callback } = options[key];
        el.addEventListener(type, callback);
      } else {
        el.setAttribute(key, (options[key] as string));
      }
    }

    return render(el);
  };
}

export const Div = elementFactory('div');
export const Nav = elementFactory('nav');

export const Ol = elementFactory('ol');
export const Ul = elementFactory('ul');
export const Li = elementFactory('Li');

export const H1 = elementFactory('h1');
export const H2 = elementFactory('h2');
export const H3 = elementFactory('h3');
export const H4 = elementFactory('h4');
export const H5 = elementFactory('h5');
export const H6 = elementFactory('h6');

export const Img = elementFactory('img');
export const Input = elementFactory('input');
export const Button = elementFactory('button');
export const A = elementFactory('a');
export const P = elementFactory('p');
export const Form = elementFactory('form');
