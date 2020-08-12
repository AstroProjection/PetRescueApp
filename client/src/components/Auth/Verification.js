import React from 'react';

const Verification = (props) => {
  return (
    <Verification className='button auth-button-form' {...props}>
      {props.children}
    </Verification>
  );
};

export default Verification;
