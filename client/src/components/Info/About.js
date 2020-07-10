import React from 'react';

// import { Formik } from 'formik';

// import * as yup from 'yup';

// const formSchema = yup.object({
//   name: yup.string().required('Please enter you name'),
//   email: yup.string().required('Please enter an email contact you'),
//   message: yup.string().required('Please enter a message'),
// });

const About = (props) => {
  // const onSubmit = (e) => {
  //   // console.log(e);
  // };
  return (
    <React.Fragment>
      <div>
        <h5>
          Pet RescYou <sup>1.0.0</sup>
        </h5>
        <br /> Contact petrescyou@gmail.com for any issues!
      </div>
      <br />
      {/*       
      (OR)
      <br />
      <br />
      <h5>Use this contact form</h5>
      <div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleSubmit, handleChange }) => (
            <form id='contact-form' onSubmit={handleSubmit} noValidate>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  name='name'
                  type='text'
                  placeholder='enter your name...'
                  className='form-control'
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  name='email'
                  placeholder='enter your email...'
                  type='email'
                  className='form-control'
                  aria-describedby='emailHelp'
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea
                  name='message'
                  placeholder='enter your message...'
                  className='form-control'
                  rows='5'
                  value={values.message}
                  onChange={handleChange}
                />
              </div>
              <button type='submit' className='btn auth-button-form'>
                Submit
              </button>
              {/* {JSON.stringify(values, null, 2)} */}
      {/* </form> */}
      {/* )} */}
      {/* // </Formik>  */}
      {/* </div> */}
    </React.Fragment>
  );
};

export default About;
