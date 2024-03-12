import { Context, createContext } from "react";

import { ReducerActionType } from "../helpers/globalTypesHelper";
import { log } from "../helpers/generalHelpers";
import { UsersNeedleResponseDataType, UsersResponseDataType } from "../pages/users/usersPageData";

export const USERS_GLOBAL_STATE_UPDATE_FULL_DATA: string = 'USERS_GLOBAL_STATE_UPDATE_FULL_DATA';
export const USERS_GLOBAL_STATE_UPDATE_NEEDLE_DATA: string = 'USERS_GLOBAL_STATE_UPDATE_NEEDLE_DATA';

export const initialGlobalUsersState: UsersGlobalStateType = {
    list: [],
    needle: '',
    currentPage: 0,
    pages: 0
};

export const usersReducer = (state: UsersGlobalStateType = initialGlobalUsersState, action: ReducerActionType): UsersGlobalStateType => {
    log("UsersContext reducer", {state, action});

    let nextState: UsersGlobalStateType;

    switch (action.type) {

        case USERS_GLOBAL_STATE_UPDATE_FULL_DATA:
            const usersDataPayload: UsersResponseDataType = action.payload;
            nextState = {
                ...state,
                list: usersDataPayload.list,
                currentPage: usersDataPayload.currentPage,
                pages: usersDataPayload.pages,
            };
            return nextState || state;

        case USERS_GLOBAL_STATE_UPDATE_NEEDLE_DATA:
            const usersNeedleDataPayload: UsersNeedleResponseDataType = action.payload;
            nextState = {
                ...state,
                list: usersNeedleDataPayload.list,
                needle: usersNeedleDataPayload.needle,
                currentPage: 1,
                pages: 1,
            };
            return nextState || state;

        default:
            return state;
    }
};

interface UsersGlobalStateType extends UsersResponseDataType {
    needle: string
}

export const UsersContext: Context<any> = createContext(null);