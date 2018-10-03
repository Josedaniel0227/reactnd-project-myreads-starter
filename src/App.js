import React from 'react'
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    this.updateBooks();
  }

  updateBooks = () =>{
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book,shelf);

    this.updateBooks();
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <MainPage
            books={this.state.books}
            changeShelf={this.changeShelf}
            />
        )} />
        <Route exact path="/search" render={() => (
          <SearchPage
          changeShelf={this.changeShelf}
          books={this.state.books}
          />
          )} />
      </div>
    )
  }
}

export default BooksApp
