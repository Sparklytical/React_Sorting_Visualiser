import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../sorting_reducer/list_actions';
import './ButtonBar.scss';
import FaPause from 'react-icons/lib/fa/pause.js';
import FaPlay from 'react-icons/lib/fa/play.js';

class ButtonBar extends React.Component {
  render() {
    const { pause, sorting, wait_time } = this.props.list;
    return (
      <div className="button">
        {!sorting ? (
          <button
            className="speed pulse active end"
            onClick={this.props.actions.randomize_array}
          >
            Randomize
          </button>
        ) : (
          <div className="X">
            {!pause ? (
              <button
                className="speed pulse active"
                onClick={this.props.actions.pause_sorting}
              >
                <FaPause />
              </button>
            ) : (
              <button
                className="speed pulse active"
                onClick={this.props.actions.restart_sorting}
              >
                <FaPlay />
              </button>
            )}
            <button
              className="speed pulse active bt"
              onClick={this.props.actions.sorting_end}
            >
              END
            </button>
          </div>
        )}
        <div className="X">
          <button
            className={wait_time === 200 ? 'speed pulse active' : 'speed pulse'}
            onClick={() => this.props.actions.speed_change(200)}
          >
            1x
          </button>
          <button
            className={wait_time === 50 ? 'speed pulse active' : 'speed pulse'}
            onClick={() => this.props.actions.speed_change(50)}
          >
            2x
          </button>
          <button
            className={wait_time === 10 ? 'speed pulse active' : 'speed pulse'}
            onClick={() => this.props.actions.speed_change(10)}
          >
            4x
          </button>
          <button
            className={wait_time === 2 ? 'speed pulse active' : 'speed pulse'}
            onClick={() => this.props.actions.speed_change(2)}
          >
            8x
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.list,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);
