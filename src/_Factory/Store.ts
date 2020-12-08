import { Action } from '../types/store-lib';

export interface State {
  [key: string]: any;
}

export interface Store {
  state: State;
  setSubscriber: (sub: any) => void;
  setInitialState: (initialState: State) => void;
  setReducer: (newReducer: (state: State, action: Action) => State) => void;
  useSelector: (callback?: (state: State) => State) => any;
  useDispatch: () => (action: Action) => void;
}

const Store = (function(): Store {
  let state: State = null;
  let reducer: (state: State, action: Action) => State = null;
  const subscriber: any[] = [];

  const setSubscriber = (sub: any) => {
    subscriber.push(sub);
  };

  const setInitialState = (initState: State) => {
    if (!state) {
      state = initState;
    } else {
      throw Error('setInitialState only can be called once');
    }
  };

  const setReducer = (newReducer: (state: State, action: Action) => State) => {
    if (!reducer) {
      reducer = newReducer;
    } else {
      throw Error('setReducer only can be called once');
    }
  };

  const useSelector = (callback?: (state: State) => State) => {
    if (!callback) {
      return state;
    } else {
      return callback(state);
    }
  };

  const useDispatch = () => {
    return (action: Action) => {
      state = reducer(state, action);
      subscriber.forEach((sub)=> {
        sub();
      });
    };
  };

  return {
    state,
    setSubscriber,
    setInitialState,
    setReducer,
    useSelector,
    useDispatch,
  };
})();

export const useSelector = Store.useSelector;
export const useDispatch = Store.useDispatch;

export default Store;
