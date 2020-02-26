/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './index.scss';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Header and Footer
import Header from 'components/Header';
import Footer from 'components/Footer';

//SIDEBAR
import Sidebar from 'react-sidebar';

import AlgorithmList from '../SortingPage/AlgorithmList/AlgorithmList';
import SortingBox from '../SortingPage/SortingBox/SortingBox';
import Head from '../SortingPage/Head/Head';
import ButtonBox from '../SortingPage/ButtonBar/ButtonBar';

import Grid from '../../containers/ShortestPath/Grid/Grid.js';
import Head1 from '../../containers/ShortestPath/Head1/Head1.js';
import ButtonBar1 from '../../containers/ShortestPath/ButtonBar1/ButtonBar1.js';
import GlobalStyle from '../../global-styles';

const mql = window.matchMedia(`(min-width: 1000px)`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: mql.matches,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta name="description" content="Sorting Visualizer" />
        </Helmet>
        <div className="grand-father">
          <Sidebar
            sidebar={<Header />}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            docked={this.state.sidebarDocked}
            // styles={{ sidebar: { background: "white" } }}
          >
            <div className="big-godfather">
              <Switch>
                <Route exact path="/pathfinding">
                  <div className="godfather">
                    <Head1 onSetSidebarOpen={this.onSetSidebarOpen} />

                    <div className="main">
                      <Grid />
                    </div>
                    <ButtonBar1 />
                  </div>
                </Route>
                <Route exact path="/">
                  <div className="godfather">
                    <Head onSetSidebarOpen={this.onSetSidebarOpen} />
                    <div className="main">
                      <SortingBox />
                    </div>
                    <ButtonBox />
                    <AlgorithmList />
                  </div>
                </Route>
              </Switch>
            </div>
          </Sidebar>
        </div>
        <GlobalStyle />
      </div>
    );
  }
}

export default App;
