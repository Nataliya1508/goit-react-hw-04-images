import React from "react";
import { Component } from "react";
import PropTypes from 'prop-types';
import Notiflix from "notiflix";
import styles from './SearchBar.module.css'


export default class Searchbar extends Component {
  state = {
    name: '',
    
  };
  // componentDidUpdate(_, prevState) {
  //   if (prevState.name !== this.state.name || prevState.page !== this.state.page) {
  //     this.onSubmitHandler();
  //   }
  // }
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ name: value });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  
    

  //   if (this.state.name.trim() === '') {
  //     Notiflix.Notify.failure(
  //       'You have to enter something first to search for images!'
  //     );
      
  //     return;
  //   }
 handleSubmit = e => {
   e.preventDefault();
   const valueInput = this.state.name.trim();
   if (!valueInput) {
   Notiflix.Notify.failure(
     'You have to enter something first to search for images!')
     return;
}

   this.props.onSubmit(valueInput);
   this.setState({ name: ''})

  
  

    this.reset();
  };

  reset() {
    
    this.setState({ name: '' });
  }

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <title>search</title>
                <path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z" />
              </svg>
            </span>
          </button>

          <input className={styles.SearchFormInput}
            type="text"
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
