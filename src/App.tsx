import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AdminPage, LoginPage, OrdersPage, ActivatePage} from "./pages";


const App = () => {
  return (
      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'login'}/>}/>
              <Route path={'login'} element={<LoginPage/>}/>
              <Route path={'activate'} element={<ActivatePage/>}/>
              <Route path={'orders'} element={<OrdersPage/>}/>
              <Route path={'admin'} element={<AdminPage/>}/>
          </Route>
      </Routes>
  );
};

export default App;
