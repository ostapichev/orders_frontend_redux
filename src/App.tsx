import {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {AdminPage, LoginPage, OrdersPage, RegisterPage, RecoveryPasswordPage, NotFoundPage} from "./pages";
import {MainLayout} from "./layouts";
import {RequiredAuth} from "./hoc";

import 'bootstrap/dist/css/bootstrap.min.css';


const App: FC = () => {
    return (
      <Routes>
          <Route path={'login'} element={<LoginPage/>}/>
          <Route path={'activate/:token'} element={<RegisterPage/>}/>
          <Route path={'recovery/:token'} element={<RecoveryPasswordPage/>}/>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'login'}/>}/>
              <Route path={'orders'} element={
                  <RequiredAuth>
                      <OrdersPage/>
                  </RequiredAuth>
              }/>
              <Route path={'admin'} element={
                  <RequiredAuth>
                      <AdminPage/>
                  </RequiredAuth>
              }/>
              <Route path={'*'} element={<NotFoundPage/>}/>
          </Route>
      </Routes>
  );
};

export default App;
