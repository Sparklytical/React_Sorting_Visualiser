import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../sortest_path_reducer/grid_actions';
import './ButtonBar1.scss';
// import {
//   ,
//   IoMdSad,
//   IoIosPlay,
//   IoMdPlay,
//   IoMdPause,
// } from 'react-icons/io';
import IoMdHappy from 'react-icons/lib/io/happy.js';
import IoMdPlay from 'react-icons/lib/io/play.js';
import IoMdPause from 'react-icons/lib/io/pause';
import IoMdSad from 'react-icons/lib/io/sad';
import GiGhost from 'react-icons/lib/fa/empire';
import FaStart from 'react-icons/lib/fa/angle-right';
import FaStop from 'react-icons/lib/fa/bullseye';
class ButtonBar1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 'white',
      dest: 'white',
      obst: 'white',
      pause: false,
      searching: false,
    };
  }

  handlReset = () => {
    this.setState({
      start: 'white',
      dest: 'white',
      obst: 'white',
      pause: false,
      searching: false,
    });
  };
  handlePause = () => {
    const paused = this.props.grid.pause;
    console.log('pause', paused);
    
    if(paused) {
      this.props.actions.algo_restart()
    }
    else this.props.actions.algo_pause()
  };

  handleSearch = () => {
    this.setState({ searching: true });
  };

  render() {
    const {
      finding,
      wait_time,
      pause,
      actv_srt_btn,
      actv_end_btn,
      actv_clog_btn,
    } = this.props.grid;

    return (
      <div className="button1">
        <div className="X1">
          <div className="X1_1">
            {!finding ? (
              <div className="X1_1">
                <button
                  className="speed1 pulse active "
                  onClick={this.props.actions.act_start_btn}
                  style={{
                    color: actv_srt_btn && '#FFE066',
                    background: actv_srt_btn && 'black',
                    boxShadow: actv_srt_btn && '0 8px 6px -6px #FFE066',
                    border: actv_srt_btn && '4px solid #FFE066',
                  }}
                >
                  <div>
                    <span>BEGIN</span>
                    <span className="emoji">
                      <IoMdSad />
                    </span>
                  </div>
                </button>
                <button
                  className="speed1 pulse active "
                  onClick={this.props.actions.act_end_btn}
                  style={{
                    color: actv_end_btn && '#217C3B',
                    background: actv_end_btn && 'black',
                    boxShadow: actv_end_btn && '0 8px 6px -6px #217C3B',
                    border: actv_end_btn && '4px solid #217C3B',
                  }}
                >
                  <span>END</span>
                  <span className="emoji">
                    <IoMdHappy />
                  </span>
                </button>

                <button
                  className="speed1 pulse active "
                  onClick={this.props.actions.act_clog_btn}
                  style={{
                    color: actv_clog_btn && '#FF3C38',
                    background: actv_clog_btn && 'black',
                    boxShadow: actv_clog_btn && '0 8px 6px -6px #FF3C38',
                    border: actv_clog_btn && '4px solid #FF3C38',
                  }}
                >
                  <span>CLOG</span>
                  <span className="emoji">
                    <GiGhost />
                  </span>
                </button>
                <button
                  className="speed1 pulse active "
                  style={{ color: 'oramge', background: '#98356d' }}
                  onClick={this.props.actions.pathfinding_algo}
                >
                  <span>START</span>
                  <span className="emoji">
                    <FaStart />
                  </span>
                </button>
                {/* <button
                  className="speed1 pulse active "
                  style={{ color: 'oramge', background: '#98356d' }}
                  // onClick={this.props.actions.pathfinding_algo}
                >
                  <span>RESET</span>
                  <span className="emoji">
                    <FaStop />
                  </span>
                </button> */}
              </div>
            ) : (
              <div style={{ display: 'flex', flexGrow: '1' }}>
                <button
                  className="speed1 pulse active"
                  style={{
                    color: 'oramge',
                    width: '2rem',
                    // border: '4px solid #95386d',
                    background: '#95386d',
                  }}
                  onClick={this.handlePause}
                >
                  <span className="emoji">
                    {
                      pause 
                      ? <IoMdPlay />
                      : <IoMdPause />
                    }
                  </span>
                </button>
                <button
                  className="speed1 pulse active"
                  onClick={this.props.actions.algo_end}
                  style={{ color: 'oramge', background: '#98356d' }}
                  // onClick={this.props.actions.pathfinding_algo}
                >
                  <span>END</span>
                  {/* <span className="emoji">
                    <GiThreePointedShuriken />
                  </span> */}
                </button>
                <div className="X1_2">
                  <button
                    className="pulse active end xxx"
                    onClick={this.props.actions.sorting_end}
                  >
                    <div 
                      onClick={() => this.props.actions.speed_change(200)} 
                      className={wait_time===200 ? 'xx active' : 'xx'}
                      >
                      <span>1x</span>
                    </div>
                    <div 
                      onClick={() => this.props.actions.speed_change(50)} 
                      className={wait_time===50 ? 'xx active' : 'xx'}
                      >
                      <span>2x</span>
                    </div>
                    <div 
                      onClick={() => this.props.actions.speed_change(1)} 
                      className={wait_time===1 ? 'xx active' : 'xx'}
                      >
                      <span>4x</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
            {/* <div>
              <button
                className="speed1 pulse active "
                style={{ color: 'oramge', background: '#95386d' }}
                onClick={this.handlReset}
              >
                <span>RESET</span>
                <span className="emoji"></span>
              </button>
            </div> */}
            {/* <button
              className="speed1 pulse active end"
              onClick={this.props.actions.sorting_end}
              onClick={this.handleStart}
              style={{ color: this.state.start }}
            >
              <span>BEGIN</span>
              <span className="emoji">
                <IoMdSad />
              </span>
            </button>

            <button
              className="speed1 pulse active end"
              onClick={this.props.actions.sorting_end}
              onClick={this.handleDest}
              style={{ color: this.state.dest }}
            >
              <span>END</span>
              <span className="emoji">
                <IoMdHappy />
              </span>
            </button>

            <button
              className="speed1 pulse active end"
              onClick={this.props.actions.sorting_end}
              onClick={this.handleObst}
              style={{ color: this.state.obst }}
            >
              <span>CLOG</span>
              <span className="emoji">
                <GiGhost />
              </span>
            </button>
            <button
              className="speed1 pulse active end"
              style={{ color: 'oramge' }}
            >
              <span>START</span>
              <span className="emoji">
                <GiThreePointedShuriken />
              </span>
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grid: state.grid,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar1);
