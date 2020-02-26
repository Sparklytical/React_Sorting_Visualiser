
import * as types from './grid_action_types';

function gridCreater(rows, column) {
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(column);
    }
    console.log('grid', grid);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            grid[i][j] = {
                row: i + 1,
                column: j + 1,
                start: false,
                end : false,
                clog : false,
                checked : false,
                path : false,
                queue : false
            };
        }
    }
    return grid;
}

const initialState = {
    grid: gridCreater(19, 23),
    finding: false,
    pause: false,
    wait_time: 1,
    actv_srt_btn: true,
    actv_end_btn: false,
    actv_clog_btn: false,
    start: [],
    end: []
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RANDOMIZE_GRID: {
            const new_state = { ...state };
            return new_state;
        }
        case types.UPDATE_GRID: {
            const new_state = { ...state };
            new_state.grid = [...action.grid];
            return new_state;
        }
        case types.ADD_ELEMENT: {
            const new_state = {...state};
            const ele = [...action.ele];
            const grid = [...new_state.grid];
            if(new_state.actv_srt_btn) {
                const srt = {...grid[ele[0]-1][ele[1]-1]};
                if(srt.start) {
                    srt.start = false;
                }
                else srt.start = true;

                const coll = [...grid[srt.row-1]]
                coll[srt.column-1] = {...srt};  
                grid[srt.row-1] = [...coll];

                if(new_state.start.length>0) {
                    const old_srt = [...new_state.start];
                    const old_srt_obj = {...grid[old_srt[0]-1][old_srt[1]-1]};
                    old_srt_obj.start = false;
                    const coll = [...grid[old_srt[0]-1]]
                    coll[old_srt[1]-1] = {...old_srt_obj};  
                    grid[old_srt[0]-1] = [...coll];
                }
                new_state.start = [ele[0], ele[1]];

                new_state.actv_srt_btn = false;
                new_state.actv_end_btn = true;
                new_state.actv_clog_btn = false;
            }
            else if(new_state.actv_end_btn) {
                let end = {...grid[ele[0]-1][ele[1]-1]};
                if(end.end) {
                    end.end = false;
                }
                else end.end = true;
                const coll = [...grid[end.row-1]]
                coll[end.column-1] = {...end};  
                grid[end.row-1] = [...coll];
                
                if(new_state.end.length>0) {
                    const old_end = new_state.end;
                    const old_end_obj = {...grid[old_end[0]-1][old_end[1]-1]};
                    old_end_obj.end = false;
                    const coll = [...grid[old_end[0]-1]]
                    coll[old_end[1]-1] = {...old_end_obj};  
                    grid[old_end[0]-1] = [...coll];
                }
                new_state.end = [ele[0], ele[1]];

                new_state.actv_srt_btn = false;
                new_state.actv_end_btn = false;
                new_state.actv_clog_btn = true;
            }
            else if(new_state.actv_clog_btn) {
                let clog = {...grid[ele[0]-1][ele[1]-1]};
                if(clog.clog) {
                    clog.clog = false;
                }
                else clog.clog = true;
                const coll = [...grid[clog.row-1]]
                coll[clog.column-1] = {...clog};  
                grid[clog.row-1] = [...coll];  
                new_state.actv_srt_btn = false;
                new_state.actv_end_btn = false;
            }
            return {...new_state, grid: [...grid]};
        }
        case types.ACV_START_BTN: {
            const new_state = { ...state };
            new_state.actv_srt_btn
                ? new_state.actv_srt_btn = false
                : new_state.actv_srt_btn = true;
            new_state.actv_clog_btn = false;
            new_state.actv_end_btn = false;
            return new_state;
        }
        case types.ACV_CLOG_BTN: {
            const new_state = { ...state };
            new_state.actv_clog_btn
                ? new_state.actv_clog_btn = false
                : new_state.actv_clog_btn = true;
            new_state.actv_srt_btn = false;
            new_state.actv_end_btn = false;
            return new_state;
        }
        case types.ACV_END_BTN: {
            const new_state = { ...state };
            new_state.actv_end_btn
                ? new_state.actv_end_btn = false
                : new_state.actv_end_btn = true;
            new_state.actv_clog_btn = false;
            new_state.actv_srt_btn = false;
            return new_state;
        }
        case types.ALGO_START: {
            const new_state = { ...state };
            new_state.finding = true;
            return new_state;
        }
        case types.ALGO_PAUSE: {
            const new_state = { ...state };
            new_state.pause = true;
            return new_state;
        }
        case types.ALGO_RESTART: {
            const new_state = { ...state };
            new_state.pause = false;
            return new_state;
        }
        case types.ALGO_END: {
            const new_state = { ...initialState };
            new_state.finding = false;
            new_state.pause = false;
            return new_state;
        }
        case types.RESET: {
            return state;
        }
        case types.SPEED_CHANGE: {
            const new_state = { ...state };
            new_state.wait_time = action.speed;
            return new_state;
        }
        default:
            return state
    }
}

export default listReducer;