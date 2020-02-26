import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../../../sortest_path_reducer/grid_actions'
import './Grid.scss';
import Box from '../Box/Box.js';
import '../ButtonBar1/ButtonBar1.js';

class Grid extends React.Component {
  render() {
    const grid = this.props.grid.grid;
    return (
      <div className="grid">
        {grid.map(row => (
          <div className="array">
            {row.map(box => (
                <Box {...box} />
            ))}
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
