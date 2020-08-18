import React from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import AnimalFullProfile from './AnimalFullProfile/AnimalFullProfile';
import { deleteAnimal } from '../../store/actions/animal';

function CustomToggle({ children, eventKey, ...rest }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    // console.log('custom toggle')
  });

  return (
    <button {...rest} type='button' onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

export const AnimalContext = React.createContext({});

const AnimalProfile = (props) => {
  const {
    name,
    animal,
    street: { street },
    profile_index,
    auth: { user },
    deleteAnimal,
  } = props;

  const identity = ['Stray', 'Pet'];

  const removeAnimal = (animalId) => {
    if (window.confirm('Are you sure you want to remove?')) {
      deleteAnimal(animalId, street._id);
    }
  };

  return (
    <Accordion>
      <div className='animal-map-profile'>
        <div className='profile-name'>
          <em>Name</em>: <strong>{name}</strong>
        </div>
        <div className='profile-type'>
          <div className='profile-type-div'>
            <em>Type</em>:<br /> <strong>{animal.type}</strong>
          </div>
          {user && user._id === animal.user && (
            <div
              className='profile-close'
              onClick={() => removeAnimal(profile_index)}
            >
              <i className='fa fa-trash'></i>
            </div>
          )}
        </div>

        <div className='profile-identity'>
          {animal.hasOwnProperty('identity') ? identity[animal.identity] : ''}
        </div>

        <div className='profile-image'>
          {animal && animal.image ? (
            <>
              <img className={`profile-img`} src={animal.image} alt='' />
            </>
          ) : (
            <>'No Image'</>
          )}
        </div>
        <div className='profile-information'>
          <em>location</em>: <strong>{street.displayName}</strong>
          {/* <br /> */}
          {/* <em>locality</em>: <strong>{street.locality}</strong> */}
        </div>
        <CustomToggle
          className='profile-btn btn-success profile-button'
          eventKey={profile_index}
        >
          Show Info
        </CustomToggle>
        <Accordion.Collapse eventKey={profile_index} className='profile-full'>
          <AnimalContext.Provider value={{ animal }}>
            <AnimalFullProfile />
          </AnimalContext.Provider>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

const mapStateToProps = (state) => ({
  street: state.street,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAnimal })(AnimalProfile);
