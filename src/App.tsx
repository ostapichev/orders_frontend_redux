import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AdminPage, OrdersPage} from "./pages";


const App = () => {
  return (
      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'orders'}/>}/>
              <Route path={'admin'} element={<AdminPage/>}/>
              <Route path={'orders'} element={<OrdersPage/>}/>
          </Route>
      </Routes>
  );
};

export default App;
