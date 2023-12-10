import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import rootReducer from "./reducers.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";

let store = createStore(rootReducer);
ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
     <App />
 </Provider>
   
 
)
