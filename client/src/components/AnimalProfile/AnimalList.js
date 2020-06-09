import React from 'react';
import AnimalProfile from './AnimalProfile';
import PropTypes from 'prop-types';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';

import { getStreetAnimals } from '../../store/actions/animal';

const AnimalList = (props) => {
  const {
    index,
    animal,
    street: { street },
    animals,
  } = props;
  // console.log(street);
  React.useEffect(() => {
    getStreetAnimals(street);
  }, [getStreetAnimals]);

  // console.log(animals['dogs']);
  return (
    <React.Fragment>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey={index}>
              Show all {animal ? animal : ''}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              {animals[`${animal}`].map((animal) => (
                <AnimalProfile
                  key={animal._id}
                  name={animal.name}
                  location={animal.location}
                />
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
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
