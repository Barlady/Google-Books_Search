import { REQUEST_BOOKS, RECEIVE_BOOKS} from './actionTypes'

const initalState = {
  query: '',
  category: '',
  valueSort: '',
  isFetching: false,
  data: {},
  error: ''

}

export const books = (state = initalState, action) => {
  switch (action.type) {
    case REQUEST_BOOKS:
      return Object.assign({}, state, {
        isFetching: true,
        query: action.query,
        category: action.category,
        valueSort: action.valueSort
      })

    case RECEIVE_BOOKS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.status === 'success' ? action.payload : initalState.data,
        error: action.status === 'error' ? action.payload : initalState.error
      })
 
    default:
      return state;
  }
}