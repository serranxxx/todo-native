import { types } from "./types";


export const AppReducer = (state = {}, action) => {

    switch (action.type) {

        case types.LOGIN:
            return {
                ...state,
                isLogged: true,
                user: action.payload
            }

        case types.LOGOUT:
            return {
                isLogged: false
            }

        case types.GET_TASKS:
            return {
                ...state,
                myTasks: action.payload
            }

        case types.CURRENT_TASK:
            return {
                ...state,
                current: action.payload
            }


        default:
            break;
    }
}
