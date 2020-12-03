interface storage {
  navigationList: ['Main Menu', 'Liked'];
}

type storageItems = 'navigationList';
type storageValues = ['Main Menu', 'Liked'];

class Component {
  private el: HTMLElement;
  private props: storage;
  private children: { child: Function, props?: storage }[];

  constructor(el: string) {
    this.el = document.createElement(el);
    this.children = [];
    this.props = null;
  }

  setChild(child: Function, props?: any) {
    this.children.push({ child, props });
    return this;
  }

  setChildren(children: { child: Function, props?: storage }[]) {
    children.forEach(({ child, props }) => {
      this.setChild(child, props);
    });

    return this;
  }

  setProps(props: storage) {
    this.props = props;
    return this;
  }

  getProps() {
    return this.props;
  }

  setText(text: string) {
    this.el.textContent = text;
    return this;
  }

  setEvent(event: string, callback: (ev: Event) => any) {
    this.el.addEventListener(event, callback);
    return this;
  }

  render(): HTMLElement {
    this.children.forEach(({ child, props }) => {
      this.el.appendChild(child(props));
    });

    return this.el;
  }
}

export default Component;
