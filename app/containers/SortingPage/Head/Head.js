import React from 'react';
import './Head.scss';
import logo from '../../../images/logo.png';
// import { DiGhostSmall } from 'react-icons/di';
import DiGhostSmall from 'react-icons/lib/fa/bars';
// import MdMenu from 'react-icons/lib/md/menu.js';
import MdSort from 'react-icons/lib/md/sort.js';
class Head extends React.Component {
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
          <div className="Head_logo">
            <div className="logo">
              <MdSort />
            </div>
            <div className="heading">
              <h1>
                SORTING <br></br> VISUALIZER
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Head;
