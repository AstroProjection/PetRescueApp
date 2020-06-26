import React from 'react';
import AnimalProfile from './AnimalProfile';
import PropTypes from 'prop-types';

import Accordion from 'react-bootstrap/Accordion';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import PageDisplay from './PageDisplay';

import { connect } from 'react-redux';

import { getStreetAnimals } from '../../store/actions/animal';

const AnimalList = (props) => {
  const {
    index,
    animal,
    faClass,
    street: { street },
    animals,
  } = props;

  const [pageNumber, setPageNumber] = React.useState(1);

  const profilePerPage = 4;
  console.log(animals);
  console.log(street);
  const noOfPages = animals.hasOwnProperty(`${animal}`)
    ? Math.ceil(animals[`${animal}`].length / profilePerPage)
    : 1;

  const updatePage = (newPage) => {
    // if (newPage <= 0) return;
    if (newPage > 0 && newPage <= noOfPages) setPageNumber(newPage);
  };

  const animalList = () => {
    let profileCount = profilePerPage;
    const startingIndex = (pageNumber - 1) * profilePerPage;
    return street && street[`${animal}`].length > 0
      ? animals[`${animal}`].map((animal, index) => {
          if (index >= startingIndex && profileCount-- > 0) {
            console.log('printing this profile');
            return (
              <AnimalProfile
                key={animal._id}
                name={animal.name}
                location={animal.location}
                animal={animal}
                profile_index={animal._id}
              />
            );
          } else {
            // console.log('returning nothing');
            // console.log(pageNumber);
            return '';
          }
        })
      : 'None';
  };

  React.useEffect(() => {
    console.log('useEffect');
    if (street) getStreetAnimals(street._id);
  }, [street]);

  return (
    <React.Fragment>
      {/* <Accordion> */}
      <Card>
        <Accordion.Toggle as={Button} variant='link' eventKey={index}>
          {street ? street[`${animal}`].length + ` ` : '0 '}
          <i className={`${faClass}`}></i>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index}>
          <>
            <PageDisplay
              pageNumber={pageNumber}
              updatePage={updatePage}
              totalPages={noOfPages}
            />
            <Card.Body>{animalList(pageNumber)}</Card.Body>
          </>
        </Accordion.Collapse>
      </Card>
      {/* </Accordion> */}
    </React.Fragment>
  );
};

AnimalList.propTypes = {
  street: PropTypes.object.isRequired,
  animals: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  street: state.street,
  animals: state.animals,
});
export default connect(mapStateToProps, { getStreetAnimals })(
  React.memo(AnimalList)
);
