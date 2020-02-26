import * as types from './list_action_types';

function waitTime(ms) {
    return (new Promise(resolve => setTimeout(resolve, ms)));
};

export const randomize_array = () => ({
    type: types.RANDOMIZE_LIST
})
export const sorting_start = (algo) => ({
    type: types.SORTING_START,
    algo
})
export const sorting_end = () => async (dispatch, getState) => {
    dispatch({
        type: types.SORTING_END
    })
    await waitTime(getState().list.wait_time);
    dispatch({
        type: types.CLEAN_LIST
    })
}

export const pause_sorting = () => ({
    type: types.SORTING_PAUSE
})
export const restart_sorting = () => ({
    type: types.SORTING_RESTART
})

export const speed_change = (speed) => ({
    type: types.SPEED_CHANGE,
    speed
})

export const update_list_a = (list) => ({
    type: types.UPDATE_LIST,
    list: [...list]
})

const update_list = async (getState, dispatch, list) => {
    const ms = getState().list.wait_time;
    if (!getState().list.sorting) return;
    await waitTime(ms)
    dispatch(update_list_a([...list]));
}

const pause_wait = async (getState) => {
    while (getState().list.pause && getState().list.sorting) {
        await waitTime(20);
    }
}

const check = async (getState, dispatch, list, force) => {
    await pause_wait(getState);
    if (!getState().list.sorting && !force) return true;
    await update_list(getState, dispatch, list);
    return false
}

export const start_bubble_sort = () => async (dispatch, getState) => {
    let list = [...getState().list.list];
    const len = list.length;

    dispatch(sorting_start('Bubble'));

    for (let i = 0; i < len; i++) {
        list[i] = { ...list[i], pointer: [...list[i].pointer, { color: 'white'}] };

        if (await check(getState, dispatch, list)) return;

        for (let j = 0; j < len - 1; j++) {
            list[j+1] = { ...list[j+1], pointer: [...list[j+1].pointer, { color: 'orange'}] };

            if (await check(getState, dispatch, list)) return;

            if (list[j].num > list[j + 1].num) {
                list[j] = { ...list[j], white: true };
                list[j + 1] = { ...list[j + 1], white: true };

                if (await check(getState, dispatch, list)) return;

                //swap
                let temp = { ...list[j], pointer: [...list[j+1].pointer] };
                list[j] = { ...list[j + 1], pointer: [...list[j].pointer] };
                list[j + 1] = { ...temp };

                if (await check(getState, dispatch, list)) return;

                list[j] = { ...list[j], white: false };
                list[j + 1] = { ...list[j + 1], white: false };

                if (await check(getState, dispatch, list)) return;

                list[j+1] = { ...list[j+1], pointer: [...list[j+1].pointer.slice(0,list[j+1].pointer.length - 1 )] };

                if (await check(getState, dispatch, list)) return;
            }
            else {
                list[j+1] = { ...list[j+1], pointer: [...list[j+1].pointer.slice(0,list[j+1].pointer.length - 1 )] };
                if (await check(getState, dispatch, list)) return;
            }
        }
        list[i] = { ...list[i], pointer: [...list[i].pointer.slice(0,list[i].pointer.length - 1 )] };

        if (await check(getState, dispatch, list)) return;
    }
    dispatch(sorting_end());
}

export const selection_sort = () => async (dispatch, getState) => {
    let list = [...getState().list.list];
    const len = list.length;

    dispatch(sorting_start("Selection"));

    for (let i = 0; i < len; i++) {

        list[i] = { ...list[i], pointer: [...list[i].pointer, { color: 'white'}] };

        if (await check(getState, dispatch, list)) return;

        let min = i;

        list[min] = { ...list[min], pointer: [...list[min].pointer, { color: 'red'}] };

        if (await check(getState, dispatch, list)) return;

        for (let j = i + 1; j < len; j++) {

            list[j] = { ...list[j], pointer: [...list[j].pointer, { color: 'orange'}] };

            if (await check(getState, dispatch, list)) return;

            if (list[min].num > list[j].num) {
                list[min] = { ...list[min], pointer: [...list[min].pointer.slice(0,list[min].pointer.length - 1 )] };
                if (await check(getState, dispatch, list)) return;
                min = j;
                list[j] = { ...list[j], pointer: [...list[j].pointer.slice(0,list[j].pointer.length - 1 )] };
                list[min] = { ...list[min], pointer: [...list[min].pointer, { color: 'red'}] };
                if (await check(getState, dispatch, list)) return;
            }
            else {
                list[j] = { ...list[j], pointer: [...list[j].pointer.slice(0,list[j].pointer.length - 1 )] };
                if (await check(getState, dispatch, list)) return;
            }
        }
        if (min !== i) {
            list[i] = { ...list[i], white: true };
            list[min] = { ...list[min], white: true };

            if (await check(getState, dispatch, list)) return;
            // await waitTime(ms+100);

            //swap
            let tmp = { ...list[i], pointer: [...list[min].pointer] };
            list[i] = { ...list[min], pointer: [...list[i].pointer] };
            list[min] = { ...tmp };

            if (await check(getState, dispatch, list)) return;

            list[i] = { ...list[i], white: false };
            list[min] = { ...list[min], white: false };
            if (await check(getState, dispatch, list)) return;

            list[min] = { ...list[min], pointer: [...list[min].pointer.slice(0,list[min].pointer.length - 1 )] };

            if (await check(getState, dispatch, list)) return;
        }

        else list[i] = { ...list[i], pointer: [...list[i].pointer.slice(0,list[i].pointer.length - 1 )] };

        if (await check(getState, dispatch, list)) return;
    }

    dispatch(sorting_end());
}


export const insertion_sort = () => async (dispatch, getState) => {
    let list = [...getState().list.list];
    const len = list.length;
    const ms = 10;
    dispatch(sorting_start("Insertion"));

    let i = 0, key, j;

    list[i] = { ...list[i], pointer: [...list[i].pointer, { color: 'white'}] };
    if (await check(getState, dispatch, list)) return;

    for (i = 1; i < len; i++) {

        list[i] = { ...list[i], pointer: [...list[i].pointer, { color: 'white'}, { color: 'orange'}] };
        if (await check(getState, dispatch, list)) return;

        j = i - 1;
        /* Move elements of list[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
        while (j >= 0 && list[j].num > list[j+1].num) {

            list[j] = { ...list[j], pointer: [...list[j].pointer, { color: 'red'}] };
            if (await check(getState, dispatch, list)) return;

            // list[j] = { ...list[j], white: true };
            // list[j + 1] = { ...list[j + 1], white: true };
            if (await check(getState, dispatch, list)) return;

            //swap
            let temp = { ...list[j], pointer: [...list[j+1].pointer] };
            list[j] = { ...list[j + 1], pointer: [...list[j].pointer] };
            list[j + 1] = { ...temp };
            if (await check(getState, dispatch, list)) return;

            // list[j] = { ...list[j], white: false };
            // list[j + 1] = { ...list[j + 1], white: false };
            if (await check(getState, dispatch, list)) return;

            list[j] = { ...list[j], pointer: [...list[j].pointer.slice(0,list[j].pointer.length - 1 )] };
            if (await check(getState, dispatch, list)) return;

            j = j - 1;
        }

        list[i] = { ...list[i], pointer: [...list[i].pointer.slice(0,list[i].pointer.length - 1 )] };
        if (await check(getState, dispatch, list)) return;
    }

    dispatch(sorting_end());
}

export const try_me = () => async (dispatch, getState) => {
    let list = [...getState().list.list];
    const len = list.length;
    const ms = 10;
    dispatch(sorting_start("Try"));

    async function merge(left, right) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        // We will concatenate values into the resultArray in order
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                resultArray.push(left[leftIndex]);
                leftIndex++; // move left array cursor
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++; // move right array cursor
            }
        }

        // We need to concat here because there will be one element remaining
        // from either left OR the right
        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

    async function mergeSort(list) {
        // No need to sort the array if the array only has one element or empty
        if (list.length <= 1) {
            return list;
        }
        // In order to divide the array in half, we need to figure out the middle
        const middle = Math.floor(list.length / 2);

        list[middle] = { ...list[middle], pointer: false };
        if (await check(getState, dispatch, list)) return;

        // This is where we will be dividing the array into left and right
        const left = list.slice(0, middle);
        const right = list.slice(middle);

        // Using recursion to combine the left and right
        return merge(
            await mergeSort(left), await mergeSort(right)
        );
    }

    await mergeSort([...list]);

    if (await check(getState, dispatch, list)) return;


    dispatch(sorting_end());
}


export const merge_sort = () => async (dispatch, getState) => {
    try {
        let list = [...getState().list.list];
        let n = list.length;
        dispatch(sorting_start("Merge"));

        let curr_size;  // For current size of subarrays to be merged 
        // curr_size varies from 1 to n/2 
        let left_start; // For picking starting index of left subarray 
        // to be merged 

        // Merge subarrays in bottom up manner.  First merge subarrays of 
        // size 1 to create sorted subarrays of size 2, then merge subarrays 
        // of size 2 to create sorted subarrays of size 4, and so on. 
        for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
            // Pick starting point of different subarrays of current size 
            for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
                // Find ending point of left subarray. mid+1 is starting  
                // point of right 
                let mid = Math.min(left_start + curr_size - 1, n - 1);
                let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

                list[left_start] = { ...list[left_start], pointer: [...list[left_start].pointer, { color: 'red'}] };
                list[right_end] = { ...list[right_end], pointer: [...list[right_end].pointer, { color: 'red'}] };
                if (await check(getState, dispatch, list)) return;
                list[mid] = { ...list[mid], pointer: [...list[mid].pointer, { color: 'orange'}] };
                if (await check(getState, dispatch, list)) return;

                // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end] 
                let i = left_start;
                let j = mid+1;
                let k = left_start;
                
                while (i < mid+1 && j < right_end+1) {
                    if (list[i].num <= list[j].num) {
                        i++;
                    }
                    else {
                        for(let kk=j; kk>k; kk--) {
                            let temp = { ...list[kk], pointer: [...list[kk-1].pointer] };
                            list[kk] = { ...list[kk-1], pointer: [...list[kk].pointer] };
                            list[kk-1] = { ...temp };
                        }
                        j++;
                        list[mid] = { ...list[mid], pointer: [...list[mid].pointer.slice(0,list[mid].pointer.length - 1 )] };
                        mid++;
                        list[mid] = { ...list[mid], pointer: [...list[mid].pointer, { color: 'orange'}] };
                        i++;
                    }
                    if(await check(getState, dispatch, list)) return true;
                    k++;
                }
                list[left_start] = { ...list[left_start], pointer: [...list[left_start].pointer.slice(0,list[left_start].pointer.length - 1 )] };
                list[right_end] = { ...list[right_end], pointer: [...list[right_end].pointer.slice(0,list[right_end].pointer.length - 1 )] };
                list[mid] = { ...list[mid], pointer: [...list[mid].pointer.slice(0,list[mid].pointer.length - 1 )] };
                if (await check(getState, dispatch, list)) return;
            }
        }

        dispatch(sorting_end());
    }
    catch (e) {
        console.log(e);
    }
}


export const quick_sort = () => async (dispatch, getState) => {
    try {
        let list = [...getState().list.list];
        let n = list.length;
        dispatch(sorting_start("Quick"));

        let l = 0, h = n - 1;

        // Create an auxiliary stack 
        let stack = new Array(h - l + 1);

        // initialize top of stack 
        let top = -1;

        // push initial values of l and h to stack 
        stack[++top] = l;
        stack[++top] = h;

        const partition = async (l, h) => {
            let x = {...list[h]};
            let i = (l - 1);

            for (let j = l; j <= h - 1; j++) {
                if (list[j].num <= x.num) {
                    i++;
                    list[j] = { ...list[j], white: true };
                    list[i] = { ...list[i], white: true };
    
                    if (await check(getState, dispatch, list)) return;
    
                    //swap
                    let temp = { ...list[j] };
                    list[j] = { ...list[i] };
                    list[i] = { ...temp };
    
                    if (await check(getState, dispatch, list)) return;
    
                    list[j] = { ...list[j], white: false };
                    list[i] = { ...list[i], white: false };
    
                    if (await check(getState, dispatch, list)) return;
                }
            }
            // swap(& arr[i + 1], & arr[h]);
            list[h] = { ...list[h], white: true };
            list[i+1] = { ...list[i+1], white: true };

            if (await check(getState, dispatch, list)) return;

            //swap
            let temp = { ...list[h] };
            list[h] = { ...list[i+1] };
            list[i+1] = { ...temp };

            if (await check(getState, dispatch, list)) return;

            list[h] = { ...list[h], white: false };
            list[i+1] = { ...list[i+1], white: false };

            if (await check(getState, dispatch, list)) return;

            return (i + 1);
        }

        // Keep popping from stack while is not empty 
        while (top >= 0) {
            // Pop h and l 
            h = stack[top--];
            l = stack[top--];

            // Set pivot element at its correct position 
            // in sorted array 
            let p = await partition(l, h);

            // If there are elements on left side of pivot, 
            // then push left side to stack 
            if (p - 1 > l) {
                stack[++top] = l;
                stack[++top] = p - 1;
            }

            // If there are elements on right side of pivot, 
            // then push right side to stack 
            if (p + 1 < h) {
                stack[++top] = p + 1;
                stack[++top] = h;
            }
        }

        dispatch(sorting_end());
    }
    catch (e) {
        console.log(e);
    }
}