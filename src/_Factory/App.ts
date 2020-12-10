/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from './Store';

type render = () => () => Element

const initialApp = (function init() {
  let rootComponent: render = null;
  let rootElement: Element = null;

  const hooks: unknown[] = [];
  let currentHook = 0;
  let store: Store = null;

  const App = {
    renderOnce: (component: render, target: Element) => {
      target.appendChild(component()());
    },
    render: (component: render, target: Element) => {
      if (!rootComponent) rootComponent = component;
      if (!rootElement) rootElement = target;

      rootElement.textContent = '';
      currentHook = 0;

      rootElement.appendChild(rootComponent()());
    }
  };

  function setStore(newStore: Store) {
    if (!store) {
      store = newStore;
      store.setSubscriber(App.render);
    } else {
      throw Error('setStore only can be called once');
    }
  }

  function useState(initialState: any): [ any, (state: any) => void ] {
    hooks[currentHook] = hooks[currentHook] || initialState;

    const setStateHookIndex = currentHook;

    const setState = (newState: any) => {
      hooks[setStateHookIndex] = newState;
      App.render(rootComponent, rootElement);
    };

    return [hooks[currentHook++], setState];
  }

  function useEffect(callback: () => void, depArray: unknown[]) {
    const hasNoDeps = !depArray;
    const deps = hooks[currentHook];
    const hasChangedDeps = deps ? !depArray.every((el, i) => el === (deps as [])[i]) : true;

    if (hasNoDeps || hasChangedDeps) {
      hooks[currentHook] = depArray;
      callback();
      App.render(rootComponent, rootElement);
    }

    currentHook++;
  }

  return {
    App,
    setStore,
    useState,
    useEffect,
  };
})();

export const setStore = initialApp.setStore;
export const useState = initialApp.useState;
export const useEffect = initialApp.useEffect;

export default initialApp.App;
