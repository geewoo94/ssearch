import Store from './Store';

class App {
  static rendered: App;
  public store: Store;
  public root: HTMLDivElement;
  public component: Function;

  constructor() {
    this.store = null;
    this.root = null;
    this.component = null;

    if (!App.rendered) {
      App.rendered = this;
    }

    return App.rendered;
  }

  setStore(store: any) {
    this.store = store;
    store.app = App.rendered;
  }

  rerender() {
    this.render(this.component, this.root);
  }

  render(component: Function, root: HTMLDivElement) {
    if (!this.root) {
      this.root = root;
    }

    if (!this.component) {
      this.component = component;
    }

    root.textContent = '';
    const rendered = component();
    root.appendChild(rendered);
  }
}

export default App;
