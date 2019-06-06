import { createActions, createReducer } from "reduxsauce";


export const { Types, Creators } = createActions({
  addProduct: ["product"]
});


const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  { id: Math.random(), text: action.product, complete: false }
];

export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT]: add
});