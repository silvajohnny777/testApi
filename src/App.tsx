import React from 'react';
import './styling/App.scss';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { WithTranslation, withTranslation } from 'react-i18next';
import 'bulma-helpers/css/bulma-helpers.min.css'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import Images from './pages/Images';
import Navbar from './components/Navbar';

import { ImagesContextProvider } from './context/ImagesContext'


interface AppProps extends WithTranslation {

}

const App: React.FC<AppProps> = () => {

  return (

    <ImagesContextProvider>

        <Router>

          <Navbar />
          <Route path={`/images`} render={(routeProps: any) => <Images {...routeProps} /> } />
          <Redirect from={`/`} exact to={`/images`} />

        </Router>

      </ImagesContextProvider>

  );

}

export default withTranslation()(App);
