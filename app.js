// counter app

// counter reducer
function counter (state = 0, action) {
  switch( action.type ) {
    case 'INCREMENT': 
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// counter store
const store = Redux.createStore(counter);

// helper function that displays dispatched action
function dispatch( action ) {
  console.log('dispatching action', action);
  store.dispatch(action);
}

// function that displays the current state
function render() {
  const state = store.getState();
  console.log('state is now', state);
}

render();
store.subscribe(render);
