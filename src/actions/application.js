export const loaderActivate = () => (dispatch) => {
    return dispatch({
        type:'LOADER_ACTIVATE'
    })
}

export const loaderDeactivate = () => (dispatch) => {
    return dispatch({
        type:'LOADER_DEACTIVATE'
    })
}

export const setMaxPages = () => (dispatch) => {
    return dispatch({
        type:'SET_MAX_PAGES'
    })
}