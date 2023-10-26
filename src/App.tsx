import {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AdminPage, LoginPage, OrdersPage, ActivatePage} from "./pages";
import {RequiredAuth} from "./hoc";


const App: FC = () => {
  return (
      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'login'}/>}/>
              <Route path={'login'} element={<LoginPage/>}/>
              <Route path={'activate'} element={<ActivatePage/>}/>
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
          </Route>
      </Routes>
  );
};

export default App;
