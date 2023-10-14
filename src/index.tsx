import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App';
import {setupStore} from "./redux";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore();
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
