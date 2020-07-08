import React from 'react';

import DatePicker from 'react-datepicker';

import { FormControl } from 'react-bootstrap';
const VaccineItem = (props) => {
  const { setFieldValue, index, values, arrayHelpers } = props;
  return (
    <React.Fragment>
      <div className='tr'>
        <div className='td'>
          <FormControl
            placeholder='Enter vaccine name..'
            className='remove-padding'
            autoComplete='new-password'
            name={`values.vaccineArr.${index}.vaccinename`}
            as='input'
            value={values.vaccineArr[`${index}`].vaccinename}
            onChange={(e) =>
              setFieldValue(`vaccineArr.${index}.vaccinename`, e.target.value)
            }
          />
        </div>
        <div className='td'>
          <DatePicker
            selected={values.vaccineArr[`${index}`].vaccineDateTaken}
            dateFormat='MMMM dd yyyy'
            autoComplete='new-password'
            className='form-control remove-padding'
            name={`values.vaccineArr.${index}.vaccineDateTaken`}
            placeholderText={'Click to select date'}
            onChange={(date) =>
              setFieldValue(`vaccineArr.${index}.vaccineDateTaken`, date)
            }
          />
        </div>
        <div className='td'>
          <DatePicker
            autoComplete='new-password'
            selected={values.vaccineArr[`${index}`].vaccineDateDue}
            dateFormat='MMMM dd yyyy'
            className='form-control remove-padding'
            name={`values.vaccineArr.${index}.vaccineDateDue`}
            placeholderText={'Click to select date'}
            onChange={(date) =>
              setFieldValue(`vaccineArr.${index}.vaccineDateDue`, date)
            }
          />
        </div>
        <div
          className='btn delete-button'
          onClick={(e) => arrayHelpers.remove(index)}
        >
          <i className='fas fa-times'></i>
        </div>
      </div>
    </React.Fragment>
  );
};

VaccineItem.propTypes = {};

export default VaccineItem;
