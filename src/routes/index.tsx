import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout';
import StructuredTextEditor from '../pages/codemirror-iecst-editor';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'codemirror-iecst-editor',
        element: <StructuredTextEditor />
      }
    ]
  }
]);

export default router;