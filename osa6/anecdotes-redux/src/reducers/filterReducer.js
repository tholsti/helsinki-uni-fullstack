export const changeFilterValue = value => ({
    type: 'CHANGE_FILTER_VALUE',
    value,
});

export const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_FILTER_VALUE':
            return action.value;
        default:
            break;
    }
    return state;
}
