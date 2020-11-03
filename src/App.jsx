import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {routes} from "./config/routes"
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './config/config';
import {ToastContainer} from "react-toastify";
import {Protected} from "./utils/auth";

import './styles/app.scss';
// app config
function App() {
  return (
    <>
      <ToastContainer position="bottom-right" closeButton={false} hideProgressBar={true}/>
      <ThemeProvider theme={theme}>
          <Router>
              <Switch>
                  {
                      routes.map(route => (
                          !route.private ?
                              <Route key={route.name} path={route.path}
                                     routeDef={route} routes={routes}
                                     component={route.component} exact={!!route.exact }/> :
                              <Protected key={route.name} path={route.path}
                                         routeDef={route} routes={routes}
                                         component={route.component} exact={!!route.exact }/>
                      ))
                  }
              </Switch>
          </Router>
      </ThemeProvider >
    </>
  );
}

export default App;
