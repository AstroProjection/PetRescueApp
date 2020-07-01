import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AnimalList from '../../AnimalProfile/AnimalList';
import { connect } from 'react-redux';
const MapInfoListing = ({
  locality,
  faClass,
  index,
  street,
  animal,
  heading,
  faSize,
}) => {
  const { localityInfo } = locality;
  return (
    <React.Fragment>
      <i className={`${faClass} ${faSize}`}></i>
      <span className={faSize}>
        {street ? ` ${street[animal].length} ` : ' 0 '}
      </span>
      {heading}
      {
        <React.Fragment>
          <Accordion>
            <AnimalList index={index} animal={animal} faClass={faClass} />
          </Accordion>
        </React.Fragment>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  locality: state.locality,
});

export default connect(mapStateToProps)(MapInfoListing);
