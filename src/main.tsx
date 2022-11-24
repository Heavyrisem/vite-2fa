import React from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';

import RootLayout from '@components/Layouts/RootLayout';
import Router from '@router/index';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RootLayout>
        <Router />
      </RootLayout>
    </RecoilRoot>
  </React.StrictMode>,
);
