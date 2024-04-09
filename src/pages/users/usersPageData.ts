export interface UsersResponseDataType {
    list: Array<UserType>;
    pages: number,
    currentPage: number,
}

export interface UsersNeedleResponseDataType {
    list: Array<UserType>;
    needle: string,
}

export interface UserType {
    id: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    username: string;
    role: string;
    avatar: string;
}