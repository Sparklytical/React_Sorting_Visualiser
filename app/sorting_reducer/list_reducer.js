import * as types from './list_action_types';

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => ({ num: start + idx, white: false, pointer: []}));
}

const initialState = {
    list : range(1, 49),
    sorting : false,
    pause : false,
    wait_time : 50,
    algo: ''
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RANDOMIZE_LIST: {
            const new_state = {...state};
            const list = [...new_state.list];
            list.sort(() => (Math.random() - 0.5));
            new_state.list = list;
            return new_state;
        }
        case types.UPDATE_LIST: {
            const new_state = {...state};
            const list = [...action.list];
            new_state.list = [...list];
            return new_state;
        }
        case types.SORTING_START: {
            const new_state = {...state};
            new_state.sorting = true;
            new_state.algo = action.algo;
            return new_state;
        }
        case types.SORTING_END: {
            const new_state = {...state};
            let list = [...new_state.list];
            for(let i in list) {
                list[i] = {...list[i], white: false, pointer: []};
            }
            new_state.list = [...list];
            new_state.sorting = false;
            new_state.pause = false;
            return new_state;
        }
        case types.CLEAN_LIST: {
            const new_state = {...state};
            let list = [...new_state.list];
            for(let i in list) {
                list[i] = {...list[i], white: false, pointer: []};
            }
            new_state.list = [...list];
            new_state.sorting = false;
            new_state.pause = false;
            return new_state;
        }
        case types.SORTING_PAUSE: {
            const new_state = {...state};
            new_state.pause = true;
            return new_state;
        }
        case types.SORTING_RESTART: {
            const new_state = {...state};
            new_state.pause = false;
            return new_state;
        }
        case types.SPEED_CHANGE: {
            const new_state = {...state};
            new_state.wait_time = action.speed;
            return new_state;
        }
        default: 
            return state
    }
}

export default listReducer;