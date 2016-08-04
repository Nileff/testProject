//get initial state from JSON string in localStorage
const initialWorker = {item: (JSON.parse(localStorage.getItem('worker')) || [])};

export default function worker(state = initialWorker, action) {
    let item = state.item.slice();
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            //if main page exit - set new -1
            if (action.payload.pathname.length !== 1)
                return {item: item, new: -1};
            else
                return state;
        case 'ADD_WORKER':
            item.push(action.worker);
            localStorage.setItem('worker', JSON.stringify(item));
            return {item: item, new: item.length - 1};
        case 'EDIT_WORKER':
            item[action.idWorker] = action.worker;
            localStorage.setItem('worker', JSON.stringify(item));
            return {item: item, new: action.idWorker};
        case 'DEL_WORKER':
            item.splice(action.idWorker, 1);
            localStorage.setItem('worker', JSON.stringify(item));
            return {item: item, new: -1};
        default:
            return state
    }
}