const initialNotification = '';

export const setNewNotification = (text, durationInSeconds) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                msg: ''
            })
        }, durationInSeconds * 1000);

        dispatch({
            type: 'SET_NOTIFICATION',
            msg: text
        })
    }
}

export const notificationReducer = (state = initialNotification, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION': {
            return action.msg;
        }
        default: {
            break;
        }
    }

    return state;
};
