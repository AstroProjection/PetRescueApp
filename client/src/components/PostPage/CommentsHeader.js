import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { addComment } from '../../store/actions/post';
import { connect } from 'react-redux';
const commentValidation = yup.object({
  text: yup.string().required('cannot submit a blank comment'),
});

let formData = {};
const CommentsHeader = ({
  post: { _id: postId, user },
  addComment,
  isLoggedin,
}) => {
  const onSubmit = (e) => {
    formData = {
      ...e,
      user,
    };
    // console.log(formData);
    addComment(formData, postId);
  };

  return isLoggedin ? (
    <React.Fragment>
      <div className='comments-header'>
        <h3>Leave A Comment</h3>
      </div>
      <Formik
        initialValues={{
          text: '',
        }}
        validationSchema={commentValidation}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form className='form my-1' noValidate={true} onSubmit={handleSubmit}>
            <textarea
              name='text'
              cols='30'
              rows='5'
              placeholder='Comment on this post'
              required
              onChange={handleChange}
            ></textarea>
            <input type='submit' className='btn btn-dark my-1' value='Submit' />
            {/* {JSON.stringify(values, null, 2)} */}
          </form>
        )}
      </Formik>
    </React.Fragment>
  ) : (
    <h3>Login to add comments...</h3>
  );
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps, { addComment })(CommentsHeader);
