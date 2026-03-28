import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  return isLoggedin ? element : <Navigate to='/login' replace />;
};

export default PrivateRoute;
