import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks} from '../actions';
import debounce from 'lodash/debounce';



const Search = ({ getBooks, query, category, valueSort}) => {


  const options = [
    { category: ' ', label: 'all' },
    { category: 'art', label: 'art' },
    { category: 'biography', label: 'biography' },
    { category: 'computers', label: 'computers' },
    { category: 'history', label: 'history' },
    { category: 'cmedical', label: 'medical' },
    { category: 'poetry', label: 'poetry' }   
  ];

  const sortOptions = [
    { sort: 'relevance', label: 'relevance' },
    { sort: 'newest', label: 'newest' }
  ]

  const debouncedGetBooks = debounce((query, category, valueSort) => {
    getBooks(query, category, valueSort);
  }, 700);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let data = e.target.elements;
    debouncedGetBooks(data.query.value, data.category.value, data.valueSort.value) 
  }




  return (
    <div className="search-books">
      <form className="header-form" onSubmit={handleOnSubmit}>
        <div className="header-input">
          <input className="header-form-input" name="query" type="search" placeholder="Search..." defaultValue={query} />
          <button className="button-form">
            <i className="fa fa-search "></i>
            </button>
        </div>
        <div className="header-form-selects">
          <div className="form-select">
        <label>
          <span className="select-label">Categories</span>
        <select name = "category" defaultValue = {category}>
          {options.map(
            ({category, label}) => 
            <option key={category} value={category}>{label}</option>
          )}
        </select>
        </label>
        </div>
        <div className="form-sort">
        <label>
        <span className="select-label">Sorting by</span>
        <select name = "valueSort" defaultValue = {valueSort} >
        {sortOptions.map(
            ({sort, label}) => 
            <option key={sort} value={sort}>{label}</option>
          )}
        </select>
        </label>
        </div>
        </div>
        </form>
    </div>
  )
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    query: state.books.query,
    category: state.books.category,
    valueSort: state.books.valueSort
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBooks
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);