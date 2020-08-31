import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/App'
import dotenv from 'dotenv';
dotenv.config();
const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
};

export default Root;