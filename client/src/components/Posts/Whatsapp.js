import React from 'react';
import { useSelector } from 'react-redux';
const Whatsapp = () => {
  const isMobile = useSelector((state) => state.device.isMobile);

  const link = encodeURIComponent('www.google.com');
  const message = ` Attention! Check this post out ${link}`;
  return (
    true && (
      <a
        href={`whatsapp://send?text=${message}`}
        data-action='share/whatsapp/share'
      >
        <i className='fab fa-whatsapp large-icon'></i>
      </a>
    )
  );
};

export default Whatsapp;
