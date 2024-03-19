import {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {AdminPage, LoginPage, OrdersPage, RegisterPage, RecoveryPasswordPage, NotFoundPage} from "./pages";
import {MainLayout} from "./layouts";
import {RequiredAuthHome} from "./hoc/RequiredAuthHome";
import {RequiredAuthAdmin} from "./hoc/RequiredAuthAdmin";

import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = () => {

    return (
      <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='activate/:token' element={<RegisterPage />} />
          <Route path='recovery/:token' element={<RecoveryPasswordPage />} />
          <Route path='/' element={<MainLayout />}>
              <Route index element={<Navigate to='/login' />} />
              <Route path='/orders' element={
                  <RequiredAuthHome>
                      <OrdersPage />
                  </RequiredAuthHome>
              } />
              <Route path='/admin' element={
                  <RequiredAuthHome>
                      <AdminPage />
                  </RequiredAuthHome>
              } />
              <Route path='*' element={<NotFoundPage />} />
          </Route>
      </Routes>
  );
};

export default App;
