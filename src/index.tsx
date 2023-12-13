import {Provider} from "react-redux";
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';

import App from './App';
import {history} from './services';
import {setupStore} from "./redux";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore();

root.render(
    <Provider store={store}>
        {/*// @ts-expect-error*/}
        <BrowserRouter history={history}>
            <App/>
        </BrowserRouter>
    </Provider>
);
