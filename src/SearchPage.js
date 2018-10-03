import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

import escapeRegExp from 'escape-string-regexp';

class SearchPage extends Component {

state = {
  query: '',
  queryBooks: []
}

  updateQuery = (query) => {
    this.setState({ query });
    this.searchBooks(query);
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((queryBooks) => {
        if (queryBooks.error){
          this.emptyQuery();
        } else {
          this.setState({ queryBooks })
        }
      })
    } else {
      this.emptyQuery();
    }
  };

  emptyQuery = () => {
    this.setState({
      // query: '',
      queryBooks: []
    });
  };


  render(){

    return(
      <div className="search-books">
        <div className="search-books-bar">

          <Link
          to="/"
          className="close-search"

          >Close</Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
             type="text"
             placeholder="Search by title or author"
             value={this.state.query}
             onChange={(event) => this.updateQuery(event.target.value)}
             />

             </div>
             </div>
             <div className="search-books-results">

             <ol className="books-grid"></ol>
             {this.state.queryBooks.map(queryBook => {
               let shelf = "none";

               this.props.books.map(book => (
                 book.id === queryBook.id ?
                 shelf = book.shelf : ''
               ));

               return(
                 <li key={queryBook.id}>
                  <Book
                    book={queryBook}
                    Shelf={shelf}
                    changeShelf={this.props.changeShelf}
                  />
                 </li>
               );
             })
           }

        </div>
      </div>
    );
  }
}

export default SearchPage;
