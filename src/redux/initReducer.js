const initialState = {
    login: false,
    username: '',
    filter: {
        evaluate: {
            supplier: '',
            year: '',
            month: ''
        }
    },
    version: 0,
    objectselected: null,
    permission: [],
    permissionActive: [],
}

const IndexReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PERMISSION':
            return {
                ...state,
                permission: action.payload
            }
        case 'PERMISSION_ACTIVE':
            return {
                ...state,
                permissionActive: action.payload
            }
        // case 'LOGIN':
        //     return {
        //         ...state,
        //         ...action.payload
        //     }
        // case 'FILTER_CHANGE':
        //     return {
        //         ...state,
        //         filter: action.payload
        //     }
        // case 'OBJECT_SELECT':
        //     return {
        //         ...state,
        //         objectselect: action.payload
        //     };
        // case 'RESET':
        //     var resetState = initialState
        //     resetState.version = action.payload.version;
        //     resetState.login = false;
        //     return resetState;
        default:
            return state
    }
}
export default IndexReducer;
