import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../sorting_reducer/list_actions';
import './AlgorithmList.scss';

class AlgorithmList extends React.Component {
  render() {
    const { sorting, algo } = this.props.list;
    return (
      <div className="algorithmlist">
        <div className="buttons">
          <li>
            <button
              className={`offset tooltip ${sorting &&
                (algo === 'Bubble' ? `active` : `inactive`)}`}
              onClick={() => !sorting && this.props.actions.start_bubble_sort()}
            >
              Bubble Sort{' '}
              <a
                class="hyper"
                href="https://en.wikipedia.org/wiki/Bubble_sort"
                title="Learn More"
                target="_blank"
              >
                ⓘ
              </a>
            </button>
          </li>
          <li>
            <button
              className={`offset tooltip ${sorting &&
                (algo === 'Selection' ? `active` : `inactive`)}`}
              onClick={() => !sorting && this.props.actions.selection_sort()}
            >
              SelectionSort{' '}
              <a
                class="hyper"
                href="https://en.wikipedia.org/wiki/Selection_sort"
                title="Learn More"
                target="_blank"
              >
                ⓘ
              </a>
            </button>
          </li>
          <li>
            <button
              className={`offset tooltip ${sorting &&
                (algo === 'Quick' ? `active` : `inactive`)}`}
              onClick={() => !sorting && this.props.actions.quick_sort()}
            >
              Quick Sort{' '}
              <a
                class="hyper"
                href="https://en.wikipedia.org/wiki/Quicksort"
                title="Learn More"
                target="_blank"
              >
                ⓘ
              </a>
            </button>
          </li>
          <li>
            <button
              className={`offset tooltip ${sorting &&
                (algo === 'Merge' ? `active` : `inactive`)}`}
              onClick={() => !sorting && this.props.actions.merge_sort()}
            >
              Merge Sort{' '}
              <a
                class="hyper"
                href="https://en.wikipedia.org/wiki/Merge_sort"
                title="Learn More"
                target="_blank"
              >
                ⓘ
              </a>
            </button>
          </li>
          <li>
            <button
              className={`offset tooltip ${sorting &&
                (algo === 'Insertion' ? `active` : `inactive`)}`}
              onClick={() => !sorting && this.props.actions.insertion_sort()}
            >
              InsertionSort{' '}
              <a
                class="hyper"
                href="https://en.wikipedia.org/wiki/Insertion_sort"
                title="Learn More"
                target="_blank"
              >
                ⓘ
              </a>
            </button>
          </li>
          <li>
            <button
              className={`offset tooltip ${sorting &&
                (algo === 'Try' ? `active` : `inactive`)}`}
              onClick={() => !sorting && this.props.actions.try_me()}
            >
              Try me
            </button>
          </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmList);
