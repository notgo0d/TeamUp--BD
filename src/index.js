import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from "react-dom/client" instead of "react-dom"
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const root = document.getElementById('root');
const rootContainer = createRoot(root);
rootContainer.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);




