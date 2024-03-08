import { Context, createContext } from "react";

import { ReducerActionType } from "../types/otherTypes";
import { log } from "../helpers/generalHelpers";
import { LoginResponseDataType } from "../pages/login/loginPageData";

export const USER_GLOBAL_STATE_UPDATE_LOGIN_DATA: string = 'USER_GLOBAL_STATE_UPDATE_LOGIN_DATA';
export const USER_GLOBAL_STATE_TRUST_UNAUTHORIZED: string = 'USER_GLOBAL_STATE_TRUSTED_UNAUTHORIZED';
export const USER_GLOBAL_STATE_TRUST_AUTHORIZED: string = 'USER_GLOBAL_STATE_TRUSTED_AUTHORIZED';
export const USER_GLOBAL_STATE_CLEAR_DATA: string = 'USER_GLOBAL_STATE_CLEAR_DATA';

export const initialGlobalUserState: UserGlobalStateType = {
    isTrustedData: false,
    isAuthorized: false,
    emailAddress: '',
    lastName: '',
    firstName: '',
    username: '',
    phoneNumber: '',
    role: '',
};

export const userReducer = (state: UserGlobalStateType = initialGlobalUserState, action: ReducerActionType): UserGlobalStateType => {
    log("UserContext reducer", {state, action});

    let nextState: UserGlobalStateType;

    switch (action.type) {

        case USER_GLOBAL_STATE_TRUST_UNAUTHORIZED:
            nextState = {...state, isTrustedData: true, isAuthorized: false};
            return nextState || state;

        case USER_GLOBAL_STATE_TRUST_AUTHORIZED:
            nextState = {...state, isTrustedData: true, isAuthorized: true};
            return nextState || state;

        case USER_GLOBAL_STATE_UPDATE_LOGIN_DATA:
            const loginDataPayload: LoginResponseDataType = action.payload;
            nextState = {
                ...state,
                firstName: loginDataPayload.firstName,
                username: loginDataPayload.username,
                role: loginDataPayload.role,
            };
            return nextState || state;

        case USER_GLOBAL_STATE_CLEAR_DATA:
            nextState = {...initialGlobalUserState, isTrustedData: true};
            return nextState || state;

        default:
            return state;
    }
};

interface UserGlobalStateType {
    isTrustedData: boolean;
    isAuthorized: boolean;
    lastName: string;
    firstName: string;
    emailAddress: string;
    phoneNumber: string;
    username: string;
    role: string;
}

export const UserContext: Context<any> = createContext(null);