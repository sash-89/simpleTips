import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ isAllowed, role,  ...props }) =>
  isAllowed
      ? <Route {...props}/>
      : <Redirect to="/login"/>;
