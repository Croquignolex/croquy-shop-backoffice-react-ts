import { Context, createContext } from "react";

import { ReducerActionType } from "../types/otherTypes";
import {UserGlobalStateUpdateDataPayloadType, UserGlobalStateType} from "../types/userTypes";

export const USER_GLOBAL_STATE_UPDATE_DATA: string = 'USER_GLOBAL_STATE_UPDATE_DATA';
export const USER_GLOBAL_STATE_TRUST_UNAUTHORIZED: string = 'USER_GLOBAL_STATE_TRUSTED_UNAUTHORIZED';
export const USER_GLOBAL_STATE_TRUST_AUTHORIZED: string = 'USER_GLOBAL_STATE_TRUSTED_AUTHORIZED';
export const USER_GLOBAL_STATE_CLEAR_DATA: string = 'USER_GLOBAL_STATE_CLEAR_DATA';

export const initialGlobalUserState: UserGlobalStateType = {
    isTrustedData: false,
    isAuthorized: false,
    emailAddress: '',
    lastName: '',
    firstName: '',
    id: '',
    phoneNumber: '',
};

export const userReducer = (state: UserGlobalStateType = initialGlobalUserState, action: ReducerActionType): UserGlobalStateType => {
    let nextState: UserGlobalStateType;
    switch (action.type) {

        case USER_GLOBAL_STATE_TRUST_UNAUTHORIZED:
            nextState = {...state, isTrustedData: true, isAuthorized: false};
            return nextState || state;

        case USER_GLOBAL_STATE_TRUST_AUTHORIZED:
            nextState = {...state, isTrustedData: true, isAuthorized: true};
            return nextState || state;

        case USER_GLOBAL_STATE_UPDATE_DATA:
            const payload: UserGlobalStateUpdateDataPayloadType = action.payload;
            nextState = {
                ...state,
                firstName: payload.firstName,
                lastName: payload.lastName,
                emailAddress: payload.emailAddress,
                phoneNumber: payload.phoneNumber,
                id: payload.id,
            };
            return nextState || state;

        case USER_GLOBAL_STATE_CLEAR_DATA:
            nextState = {...initialGlobalUserState, isTrustedData: true};
            return nextState || state;

        default:
            return state;
    }
};

export const UserContext: Context<any> = createContext(null);