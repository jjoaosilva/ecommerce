import { createActions, createReducer } from "reduxsauce";


export const { Types, Creators } = createActions({
  addProduct: ["product"]
});


const INITIAL_STATE = {
  quantidade_itens: 0,
  valor_total: 0,
  itens: [
    {product_id: 55, product_preco: 45, product_quantidade: 2},
    {product_id: 58, product_preco: 45, product_quantidade: 1}, 
  ]
};

function manageCookies(state, action){
  var exist = false

  if(state.itens.length != 0){
    for(var i = 0; i < state.itens.length; i ++){
      console.log("state.itens.length ",state.itens.length)
      if(state.itens[i].product_id === action.product.product_id){
        state.itens[i].product_quantidade = state.itens[i].product_quantidade + action.product.product_quantidade
        exist = true
        break;
      }
    }
  }  
  if(!exist){
    state.itens.push(action.product)
  }

  state.quantidade_itens = 0
  state.valor_total = 0

  for(var i = 0; i < state.itens.length; i ++){
    state.quantidade_itens = state.quantidade_itens + state.itens[i].product_quantidade
    state.valor_total = state.valor_total + state.itens[i].product_quantidade*state.itens[i].product_preco
  }

  return state
}

const add = (state = INITIAL_STATE, action) => 
  manageCookies(state, action)


export default createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT]: add
});