import * as types from './grid_action_types';

function waitTime(ms) {
    return (new Promise(resolve => setTimeout(resolve, ms)));
};

export const randomize_array = () => ({
    type: types.RANDOMIZE_GRID
})
export const algo_start = (algo) => ({
    type: types.ALGO_START,
    algo
})
export const algo_end = () => async (dispatch, getState) => {
    dispatch({
        type: types.ALGO_END
    })
    await waitTime(getState().grid.wait_time);
    dispatch({
        type: types.ALGO_END
    })
}

export const algo_pause = () => ({
    type: types.ALGO_PAUSE
})
export const algo_restart = () => ({
    type: types.ALGO_RESTART
})

export const speed_change = (speed) => ({
    type: types.SPEED_CHANGE,
    speed
})

export const update_grid_a = (grid) => ({
    type: types.UPDATE_GRID,
    grid: [...grid]
})

const update_grid = async (getState, dispatch, grid) => {
    const ms = getState().grid.wait_time;
    if (!getState().grid.finding) return;
    dispatch(update_grid_a([...grid]));
    await waitTime(ms)
}

const pause_wait = async (getState) => {
    while (getState().grid.pause && getState().grid.finding) {
        await waitTime(20);
    }
}

const check = async (getState, dispatch, grid, force) => {
    await pause_wait(getState);
    if (!getState().grid.finding && !force) return true;
    await update_grid(getState, dispatch, grid);
    return false
}

export const act_start_btn = () => ({
    type: types.ACV_START_BTN
})

export const act_end_btn = () => ({
    type: types.ACV_END_BTN
})

export const act_clog_btn = () => ({
    type: types.ACV_CLOG_BTN
})

export const add_element = (ele) => ({
    type: types.ADD_ELEMENT,
    ele
})

const point_equal = (p1, p2) => (p1.row===p2.row && p1.column===p2.column);

const surrounding_point = (grid, point) => {
    const ret = [];
    const row = grid.length, column = grid[0].length;
    const ro=point.row-1, col = point.column-1;
    if(ro-1 >= 0) ret.push({...grid[ro-1][col]});
    if(col-1 >= 0) ret.push({...grid[ro][col-1]});
    if(ro+1 < row) ret.push({...grid[ro+1][col]});
    if(col+1 < column) ret.push({...grid[ro][col+1]});
    return ret;
}

export const pathfinding_algo = () => async (dispatch, getState) => {
    try {
        const state = getState().grid;
        console.log('algo start pathfinding');
        
        let grid = [...state.grid];
        const srt = state.start;
        const ed = state.end;
        dispatch(algo_start());
        let start = {...grid[srt[0]-1][srt[1]-1]};
        let end = {...grid[ed[0]-1][ed[1]-1]};

        start.queue = true;

        grid = [...getState().grid.grid];
        const coll = [...grid[start.row-1]]
        coll[start.column-1] = {...start};  
        grid[start.row-1] = [...coll];
        
        if(await check(getState, dispatch, grid)) return;
        
        let queue = [
            { 
                point: {...start}, 
                path: [{...start}]
            }
        ];
        let k = 0
        while(queue.length > 0) {
            console.log('itr');
            const tp = {...queue[0].point};
            grid = [...getState().grid.grid];
            const top = {...grid[tp.row-1][tp.column-1]}
            const path = [...queue[0].path];
            queue = [...queue.splice(1)];
            
            top.queue = false;
            top.checked = true;

            grid = [...getState().grid.grid];
            const coll = [...grid[top.row-1]]
            coll[top.column-1] = {...top};  
            grid[top.row-1] = [...coll];

            if(await check(getState, dispatch, grid)) return;

            grid = [...getState().grid.grid];
            const neighbour = surrounding_point(grid , top);

            for(let i in neighbour) {
                grid = [...getState().grid.grid];
                let curr = {...grid[neighbour[i].row-1][neighbour[i].column-1]}
                if(point_equal(curr, end)) {
                    for(k in path) {
                        const kk = {...path[k]}
                        kk.path = true;
                        
                        grid = [...getState().grid.grid];
                        const coll = [...grid[kk.row-1]]
                        coll[kk.column-1] = {...kk};  
                        grid[kk.row-1] = [...coll];
                        if(await check(getState, dispatch, grid)) return;
                    }
                    
                    dispatch(algo_pause());
                    return;
                };
                if(curr.checked || curr.queue || curr.clog) continue;
                const new_path = [...path, {...curr}];
                
                
                queue = [
                    ...queue, 
                    { 
                        point : {...curr}, 
                        path: [...new_path]
                    }
                ];
                curr.queue = true;
                
                grid = [...getState().grid.grid];
                const coll = [...grid[curr.row-1]]
                coll[curr.column-1] = {...curr};  
                grid[curr.row-1] = [...coll];
                
                if(await check(getState, dispatch, grid)) return;
            }
            // queue = [...queue];
        }
        // dispatch(algo_pause());
    }
    catch(e) {
        throw('catch err', e);
    }
}