import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import { Roles } from 'types/API';

import useAxiosInstance from '@hooks/useAxiosInstance';
import Home from '@pages/Home';
import Login from '@pages/Login/index';
import Register from '@pages/Register/index';
import Test from '@pages/Test';
import userState from '@recoil/atoms/user';
import { getLoggedInUser } from '@utils/api/user';

import PrivateRouter from './PrivateRouter';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
          index
        />
        <Route
          path="/test"
          element={
            <PrivateRouter roles={[Roles.TEST_ROLE]}>
              <Test />
            </PrivateRouter>
          }
          index
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
