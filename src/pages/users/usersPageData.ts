export interface UsersResponseDataType {
    list: Array<SimpleUserType>;
    pages: number,
    currentPage: number,
}

export interface UsersNeedleResponseDataType {
    list: Array<SimpleUserType>;
    needle: string,
}

export interface SimpleUserType {
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    username: string;
    role: string;
    avatar: string;
}