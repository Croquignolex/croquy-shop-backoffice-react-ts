export interface UserGlobalStateUpdateDataPayloadType {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    id: string;
}

export interface UserGlobalStateType {
    isTrustedData: boolean;
    isAuthorized: boolean;
    lastName: string;
    firstName: string;
    emailAddress: string;
    phoneNumber: string;
    id: string;
}
