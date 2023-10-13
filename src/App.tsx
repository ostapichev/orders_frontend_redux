import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./MainLayout/MainLayout";
import {OrdersPage} from "./pages/OrdersPage/OrdersPage";
import {GroupsPage} from "./pages/GroupsPage/GroupsPage";
import {UsersPage} from "./pages/UsersPage/UsersPage";
import {OrderDetailsPage} from "./pages/OrderDetailsPage/OrderDetailsPage";


const App = () => {
  return (
      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'orders'}/>}/>
              <Route path={'admin'} element={<UsersPage/>}/>
              <Route path={'groups'} element={<GroupsPage/>}/>
              <Route path={'orders'} element={<OrdersPage/>}>
                  <Route path={':id'} element={<OrderDetailsPage/>}/>
              </Route>
          </Route>
      </Routes>
  );
};

export default App;
