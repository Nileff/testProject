export function add(worker) {
    return {
        type: 'ADD_WORKER',
        worker: worker
    }
}

export function edit(idWorker, worker){
    return {
        type: 'EDIT_WORKER',
        idWorker: idWorker,
        worker: worker
    }
}

export function del(idWorker){
    return {
        type: 'DEL_WORKER',
        idWorker: idWorker
    }
}