import React from "react";
import PropTypes from "prop-types"
import styles from './Button.module.css'


export default function LoadMoreBtn({ onButtonClick }) {
    return (
        <div>
            <button className={styles.Button} type="button" onClick={onButtonClick}>
                LOAD MORE
            </button>

        </div>
    )
}

LoadMoreBtn.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};