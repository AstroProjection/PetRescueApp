import React from 'react';
import PropTypes from 'prop-types';

const PageDisplay = ({ pageNumber, updatePage, totalPages }) => {
  return (
    totalPages > 0 && (
      <>
        <div>
          <button
            onClick={() => {
              updatePage(pageNumber - 1);
            }}
          >
            prev page
          </button>
          {`${pageNumber}/${totalPages}`}
          <button
            onClick={() => {
              updatePage(pageNumber + 1);
            }}
          >
            next page
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
