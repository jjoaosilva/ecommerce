import { createActions, createReducer } from "reduxsauce";


export const { Types, Creators } = createActions({
  addProduct: ["product"],
  rmvProduct: ["product"],
  clearProduct: ["product"],
});


const INITIAL_STATE = []


const add = (state = INITIAL_STATE, action) =>{
  if(state.length != 0){
    for(var i = 0; i < state.length; i ++){
      if(state[i].product_id === action.product.product_id){
        return (state.map(
                  product =>
                  product.product_id === action.product.product_id ? { ...product, product_quantidade: product.product_quantidade+1 } : product
                ))
      }
    }
  }
  return [...state, action.product]
}

const clr = (state = INITIAL_STATE, action) =>
  state.filter(todo => null);


const rmv = (state = INITIAL_STATE, action) => {
 
  if(state.length != 0){
    for(var i = 0; i < state.length; i ++){
      if(state[i].product_id === action.product.product_id){
        return (state.map(
          product =>
          product.product_id === action.product.product_id ? 
          { ...product, product_quantidade: product.product_quantidade==0 ? 
                                            0 : product.product_quantidade-1 
          } 
          : product
        ))
      }
    }
  }
  return [...state, action.product]
}

export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT]: add,
  [Types.RMV_PRODUCT]: rmv,
  [Types.CLEAR_PRODUCT]: clr,
});