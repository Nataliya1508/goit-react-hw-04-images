import React from "react";
import { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./Button/Button"
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader" 
import  { searchImages } from "./../api/images"
import Searchbar from "./SearchBar/SearchBar";
import Notiflix from "notiflix";


export const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  const perPage = 12;

  useEffect(() => {
    if (query === '') {
      return
    }
    setLoading(true);
  

  searchImages(query, page, perPage)
    .then(data => {
      if (!data.total) {
        throw new Error('No images found');
      }

      if (data.total > page * perPage + perPage) {
        setShowLoadMore(true);
      } else if (data.total <= page * perPage + perPage) {
        setShowLoadMore(false)
        
        Notiflix.Notify.info(
          "We're sorry, but this is the end of the search."
        );
      }
      setHits(prevState => [...prevState, ...data.hits]);
      setTotalImages(data.totalHits);
      setLoading(false)

    }).catch(error => {
      setError(error.message);
      setLoading(false);
      setShowLoadMore(false);
    });
  
}, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setHits([]);
    setPage(1);
  };
  
  const toogleModal = (imageURL) => {
    setShowModal(!showModal);
    setLargeImageURL(imageURL);
   
  };
  
 
  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setTotalImages(totalImages + perPage);
   
  };
  

    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />

        {loading && <Loader />}
        {error && <p>Oops! Something went wrong!</p>}
        {hits && (
          <ImageGallery images={hits} onImage={toogleModal} />)}
        

        {showModal && (
          <Modal onClose={toogleModal} url={largeImageURL}/>
        )}

        {hits.length > 0 && (
          <LoadMoreBtn onButtonClick={() => loadMore(showLoadMore)} />
        )}
      </div>
    );
  }



