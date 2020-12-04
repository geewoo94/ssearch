const initialApp = (function init() {
  let rootComponent: Function = null;
  let rootElement: Element = null;

  const hooks: any = [];
  let currentHook: any = 0;

  const App = {
    render: (component: Function, target: Element) => {
      if (!rootComponent) rootComponent = component;
      if (!rootElement) rootElement = target;

      target.textContent = '';
      currentHook = 0;

      target.appendChild(component()());
    }
  }

  function useState(initialState: any): any {
    hooks[currentHook] = hooks[currentHook] || initialState;

    const setStateHookIndex = currentHook;

    const setState = (newState: any) => {
      hooks[setStateHookIndex] = newState;
      App.render(rootComponent, rootElement);
    };

    return [hooks[currentHook++], setState];
  }

  function useEffect(callback: Function, depArray: any[]) {
    const hasNoDeps = !depArray
    const deps = hooks[currentHook]
    const hasChangedDeps = deps ? !depArray.every((el, i) => el === deps[i]) : true

    if (hasNoDeps || hasChangedDeps) {
      callback()
      hooks[currentHook] = depArray
    }

    currentHook++
  }

  return {
    App,
    useState,
    useEffect,
  }
})()

export const useState = initialApp.useState;
export const useEffect = initialApp.useEffect;

export default initialApp.App;
