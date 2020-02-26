import React from 'react';
import './Head1.scss';
import logo from '../../../images/logo.png';
import DiGhostSmall from 'react-icons/lib/fa/bars';
import FaRoute from 'react-icons/lib/fa/delicious';
class Head1 extends React.Component {
  render() {
    return (
      <div>
        <div className="Head">
          <div className="Head_button">
            <button
              onClick={() => this.props.onSetSidebarOpen(true)}
              className="sidebutton"
            >
              <div className="symbol">
                <DiGhostSmall />
              </div>
            </button>
          </div>
          <div className="Head_logo1">
            <div className="logo1">
              <FaRoute size="4rem" />
            </div>
            <div className="heading1">
              <h1>
                SHORTEST <br></br> PATH
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Head1;
