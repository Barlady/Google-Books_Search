import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';


import BookCard from '../components/BookCard';

const renderBooksList = (data) => {
  if (isEmpty(data)) {
    return null;
  }
  let { items: books, totalItems } = data;


  return (
    <>
    <div className="book-result">
      <p>Total results: {totalItems}</p>
      </div>
      <div className="books-list">
        {books.map(book => <BookCard key={book.id} book={book} />)}
      </div>
    </>
  )
}


const Books = ({ data, isFetching, query, category, valueSort, error }) => {
  let jsxStr = ''

  if (isFetching) {
    jsxStr = <p>Loading...</p>
  } else if (!isEmpty(error)) {
    jsxStr = JSON.stringify(error)
  } else {
    jsxStr = renderBooksList(data, query, category, valueSort);
  }
  return (
    <div className="books">
      {jsxStr}
    </div>
  )
}

const mapStateToProps = (state) => {
  let { data, isFetching, query, category, valueSort, error} = state.books
  return {
    data,
    isFetching,
    query,
    category,
    valueSort,
    error
  }
}

export default connect(
  mapStateToProps,
  null
)(Books);