import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import {PersistGate} from "redux-persist/integration/react"
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { Provider } from "react-redux";

import {store, persistor} from "./store";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/app'));
// Pages
const FuncLogin = React.lazy(() => import('./views/Pages/FuncLogin'));
const FuncRegister = React.lazy(() => import('./views/Pages/FuncRegister'));
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Cards = React.lazy(() => import('./views/Base/Cards'));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>
              <React.Suspense fallback={loading()}>
                <Switch>
                  <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                  <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                  <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                  <Route exact path="/adm" name="FuncLogin" render={props => <FuncLogin {...props}/>} />
                  <Route exact path="/admRegister" name="FuncRegister" render={props => <FuncRegister {...props}/>} />
                  <Route path="/" name="Home" render={props => <DefaultLayout  {...props}/>} />
                </Switch>
              </React.Suspense>
          </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
