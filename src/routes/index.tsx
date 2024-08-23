import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout';
import CodemirrorIECSTPage from '../pages/codemirror-iecst';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'codemirror-iecst-editor',
        element: <CodemirrorIECSTPage />
      }
    ]
  }
]);

export default router;