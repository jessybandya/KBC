import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SoftUIControllerProvider } from "./context";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'
import "./index.css"
import {Provider} from "react-redux"
import store, {persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'



ReactDOM.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
  <SoftUIControllerProvider>
  <ToastContainer />
    <App />
  </SoftUIControllerProvider>
</BrowserRouter>
  </PersistGate> 
  </Provider>,
  document.getElementById("root")
);
