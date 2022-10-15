import React from "react";
import { Component } from "react";
// import axios from "axios";
// import Notiflix from "notiflix";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./Button/Button"
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader" 
import  { searchImages } from "./../api/images"
import Searchbar from "./SearchBar/SearchBar";

const perPage = 12;
export default class App extends Component {
  state = {
    hits: [],
    query: '',
    page: 1,
    showModal: false,
    showLoadMore: false,
    loading: false,
    largeImageURL: '',
    tags: '',
    error: null,
    total: 0,
    totalImages: 0,
  };

  async componentDidUpdate(_, prevstate) {
    const { page, query, hits } = this.state;
    if (prevstate.query !== query || prevstate.page !== page) {
      
      this.setState({ loading: true });
    
      try {
        const data = await searchImages(query, page, perPage);
        if (!data.total) {
          throw new Error('No images found');
        }
      
        this.setState({
          totalImages: data.totalHits,
          hits: [...hits, ...data.hits],
          loading: false,
        });
  
      } catch (error) {
        console.error(error.message);
        this.setState({ loading: false, showLoadMore: false });
      }
    }
  }

  
  handleFormSubmit = query => {
    if (query !== this.state.query) {
       this.setState({ query: query, page: 1, hits: []});
    }
  }

  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };


  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
       
      }
    })
  };




  render() {
    const { hits, showModal, loading, largeImageURL, tags, error, totalImages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {loading && <Loader />}
        {error && <p>Oops! Something went wrong!</p>}
        {hits && (
          <ImageGallery images={hits} onImage={this.toggleModal} />)}
        

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}

        {hits.length > 0 && (
          <LoadMoreBtn onButtonClick={() => this.loadMore()} />
        )}
      </div>
    );
  }
}


