import axios from 'axios'
import {
  REQUEST_BOOKS,
  RECEIVE_BOOKS

} from './actionTypes'

export const requestBooks = (query, category, valueSort) => ({
  type: REQUEST_BOOKS,
  query,
  category,
  valueSort

})


export const receiveBooks = ({status, payload }) => ({
  type: RECEIVE_BOOKS,
  status,
  payload
})




export const getBooks = (query, category, valueSort) => {
  return function (dispatch) {
  	dispatch(requestBooks(query, category, valueSort));
    const API_KEY = 'AIzaSyClms_nJUPMfWJhn0APcGabaa9F7XyQvlM';
  	const url = `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${category}&orderBy=${valueSort}&startIndex=0&maxResult=30&key=${API_KEY}`
  	return axios.get(url)
    .then(response => {
      dispatch(receiveBooks({
        status: 'success',
        payload: response.data,

      }))
    })
    .catch(error => {
      dispatch(receiveBooks({
        status: 'error',
        payload: error
      }))
    })
  };
}