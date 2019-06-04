import { createActions, createReducer} from 'reduxsauce'

export const { Types, Creators} = createActions({
    addTodo: ['text'] //addTodo é o constType e 'text' a variavel que minha action iria receber
})

const INICIAL_STATE = [];

const add = (state = INICIAL_STATE, action) => [
    ...state, {id: 1, text: action.text, complete: false}
]

export default createReducer(INICIAL_STATE, {
    [Types.ADD_TODO]: add
})