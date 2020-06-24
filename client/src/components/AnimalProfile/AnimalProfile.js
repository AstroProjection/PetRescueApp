import React from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Card from 'react-bootstrap/Card';
import AnimalFullProfile from './AnimalFullProfile/AnimalFullProfile';

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
  } = props;

  return (
    <Accordion>
      <div className='animal-map-profile'>
        <div className='profile-name'>
          <em>Name</em>: <strong>{name}</strong>
        </div>
        <div className='profile-type'>
          <em>Type</em>: <strong>{animal.type}</strong>
        </div>
        <div className='profile-identity'>
          {animal.identity ? animal.identity : 'Stray'}
        </div>

        <div className='profile-image'>
          {animal && animal.image ? (
            <>
              <img className={`profile-img`} src={`${animal.image}`} />
            </>
          ) : (
            <>No Image'</>
          )}
        </div>
        <div className='profile-information'>
          <em>location</em>: <strong>{street.displayName}</strong>
          {/* <br /> */}
          {/* <em>locality</em>: <strong>{street.locality}</strong> */}
        </div>
        <CustomToggle
          className='profile-btn btn-success profile-button'
          eventKey={`${profile_index}`}
        >
          Toggle full profile
        </CustomToggle>
        <Accordion.Collapse
          eventKey={`${profile_index}`}
          className='profile-full'
        >
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
});

export default connect(mapStateToProps)(AnimalProfile);
