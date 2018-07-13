// counter app

// counter reducer
function counter (state = 0, action = {}) {
  switch( action.type ) {
    case 'INCREMENT': 
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'INCREMENT_VALUE':
      return state + action.value;
    default:
      return state;
  }
}

function multipleCounter ( state = [], action = {} ) {
  switch( action.type ) {
    case 'ADD_COUNTER': 
      return [
        ...state, 
        0
      ];
    case 'INCREMENT':
    case 'DECREMENT':
    case 'INCREMENT_VALUE':
      const newState = [...state];
      const index = action.id;
      newState[index] = counter( newState[index], action);
      return newState;
    default:
      return state;
  }
  
}

console.assert(multipleCounter().length === 0, 'should be empty' );
console.assert(
  multipleCounter([], {type:'ADD_COUNTER'}).length === 1, 
  'should add counters' 
);

console.assert(
  multipleCounter([], {type:'ADD_COUNTER'})[0] === 0, 
  'should add counters with 0 as default value' 
);

console.assert(
  ''+ multipleCounter([0,0], {type:'INCREMENT', id: 1}) == ''+ [0,1], 
  'should increment value with correct index' 
);

console.assert( counter() === 0, 'initial state must be 0' );
console.assert( counter(0, {type:'INCREMENT'}) === 1, 'increment' );
console.assert( counter(10, {type:'DECREMENT'}) === 9, 'decrement' );

console.assert( 
  counter(2, {type:'INCREMENT_VALUE', value:10}) === 12, 
  'should increment by value'
);

const rootReducer = Redux.combineReducers({
  multipleCounter,
});

// function rootReducer( state = {}, action = {} ) {
//   return {
//     multipleCounter: multipleCounter(state.multipleCounter, action),
//   };
// }

// counter store
const store = Redux.createStore(rootReducer);

// helper function that displays dispatched action
function dispatch( action ) {
  console.log('dispatching action', action);
  store.dispatch(action);
}

function incrementValue(value) {
  dispatch({
    type:'INCREMENT_VALUE',
    value,
  });
}

function increment(index) {
  dispatch({type:"INCREMENT", id: index});
}

function decrement(index) {
  dispatch({type:"DECREMENT", id: index});
}

function renderCounter(state, index) {
  return `
    <div>${state}</div>
    <button onclick='decrement(${index})'>
      -
    </button>
    <button onclick='increment(${index})'>
      +
    </button>
  `;
}

// function that displays the current state
function render() {
  const state = store.getState().multipleCounter;
  console.log('state is now', state);

  document.body.innerHTML = 
    `<button onclick='dispatch({type:"ADD_COUNTER"})'>add counter</button>`;

  state.map( (value, index) => {
    document.body.innerHTML += renderCounter(value, index);
  } );

}

render();
store.subscribe(render);
