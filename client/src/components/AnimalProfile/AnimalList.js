import React from 'react';
import AnimalProfile from './AnimalProfile';
import PropTypes from 'prop-types';

import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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

  const animalList = () => {
    return street && street[`${animal}`].length > 0
      ? animals[`${animal}`].map((animal) => (
          <AnimalProfile
            key={animal._id}
            name={animal.name}
            location={animal.location}
            animal={animal}
          />
        ))
      : 'None';
  };

  React.useEffect(() => {
    getStreetAnimals(street);
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
          <Card.Body>{animalList()}</Card.Body>
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
export default connect(mapStateToProps)(AnimalList);
