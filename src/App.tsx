import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./MainLayout";
import {AdminPage, GroupsPage, OrdersPage} from "./pages";


const App = () => {
  return (
      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'orders'}/>}/>
              <Route path={'admin'} element={<AdminPage/>}/>
              <Route path={'groups'} element={<GroupsPage/>}/>
              <Route path={'orders'} element={<OrdersPage/>}/>
          </Route>
      </Routes>
  );
};

export default App;
