import React from 'react';
import { useSelector } from 'react-redux';
const Whatsapp = ({ postURL }) => {
  const isMobile = useSelector((state) => state.device.isMobile);

  const link = encodeURIComponent(`http://www.petrescyou.in/post/${postURL}`);
  const message = ` Attention Required! Find oout about the report ${link}`;
  return (
    isMobile && (
      <a
        href={`whatsapp://send?text=${message}`}
        data-action='share/whatsapp/share'
      >
        <i className='fab fa-whatsapp large-icon whatsapp-color'></i>
      </a>
    )
  );
};

export default Whatsapp;
