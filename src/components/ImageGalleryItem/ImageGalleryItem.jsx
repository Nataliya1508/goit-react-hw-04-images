import React from "react";
import PropTypes from "prop-types"
import styles from './ImageGalleryItem.module.css'

 const ImageGalleryItem = ({ src, tags, largeImageURL, onImage}) => {
  return (
    <>
      
        <li className={styles.ImageGalleryItem}
      
        onClick={() => onImage(largeImageURL)}>
        <img className={styles.ImageGalleryItemImage}
           src={src}
            alt={tags}
          />
        </li>
    </>
  );
}


ImageGalleryItem.propTypes = {
  
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onImage: PropTypes.func.isRequired,
};
export default ImageGalleryItem;



