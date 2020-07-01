import React from 'react';
import PropTypes from 'prop-types';

const PageDisplay = ({ pageNumber, updatePage, totalPages }) => {
  return (
    totalPages > 0 && (
      <>
        <div className='page-display'>
          <button
            className='page-button'
            onClick={() => {
              updatePage(pageNumber - 1);
            }}
          >
            <i className='fas fa-angle-left'></i>
          </button>
          {`${pageNumber}/${totalPages}`}
          <button
            className='page-button'
            onClick={() => {
              updatePage(pageNumber + 1);
            }}
          >
            <i className='fas fa-angle-right'></i>
          </button>
        </div>
      </>
    )
  );
};

PageDisplay.propTypes = {
  totalPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired,
};

export default PageDisplay;
