export function render(el: Element) {
  return (function(...children: Element[] | null): Element {
    if (typeof children[0] === 'string' || typeof children[0] === 'number') {
      this.textContent = String(children[0]);
      return this;
    }

    if (children[0] === null) return this;

    children.forEach((child) => {
      this.appendChild(child);
    })

    return this;
  }).bind(el);
}

function elementFactory(type: string) {
  return function (options?: any) {
    const el = document.createElement(type);

    for (const key in options) {
      if (key === 'onClick') {
        el.addEventListener('click', options[key]);
      } else if (key === 'onChange') {
        el.addEventListener('change', options[key]);
      } else {
        el.setAttribute(key, options[key]);
      }
    }

    return render(el);
  }
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
