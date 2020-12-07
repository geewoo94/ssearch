/* eslint-disable @typescript-eslint/no-explicit-any */
type render = () => () => Element

const initialApp = (function init() {
  let rootComponent: render = null;
  let rootElement: Element = null;

  const hooks: unknown[] = [];
  let currentHook = 0;

  const App = {
    render: (component: render, target: Element) => {
      if (!rootComponent) rootComponent = component;
      if (!rootElement) rootElement = target;

      target.textContent = '';
      currentHook = 0;

      target.appendChild(component()());
    }
  };

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
    }

    currentHook++;
  }

  return {
    App,
    useState,
    useEffect,
  };
})();

export const useState = initialApp.useState;
export const useEffect = initialApp.useEffect;

export default initialApp.App;
