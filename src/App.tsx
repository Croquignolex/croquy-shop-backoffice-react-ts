import React, { FC, ReactElement, Suspense, useContext, useReducer, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

import { Routes } from "./routes";
import { getLocaleStorageItem } from "./helpers/localStorageHelpers";
import { initialGlobalUsersState, UsersContext, usersReducer } from "./contexts/UsersContext";
import { log } from "./helpers/generalHelpers";
import { LoginResponseDataType } from "./pages/login/loginPageData";
import {
    initialGlobalUserState,
    USER_GLOBAL_STATE_TRUST_UNAUTHORIZED,
    UserContext,
    USER_GLOBAL_STATE_TRUST_AUTHORIZED,
    userReducer, USER_GLOBAL_STATE_UPDATE_LOGIN_DATA
} from "./contexts/UserContext";

const SuspenseLoader: FC = (): ReactElement => {
    log("SuspenseLoader component");

    return (
        <Box position='relative' h='100vh'>
            <AbsoluteCenter axis='both'>
                <Spinner color='green.500' size='xl' />
            </AbsoluteCenter>
        </Box>
    );
};

const GlobalState: FC = (): ReactElement => {
    const { globalUserState, setGlobalUserState } = useContext(UserContext);

    useEffect((): void => {
        const userPersistedData: any = getLocaleStorageItem('user');

        if(userPersistedData) {
            const data: LoginResponseDataType = userPersistedData;

            setGlobalUserState({ type: USER_GLOBAL_STATE_TRUST_AUTHORIZED });
            setGlobalUserState({ type: USER_GLOBAL_STATE_UPDATE_LOGIN_DATA, payload: data });
        } else {
            setGlobalUserState({ type: USER_GLOBAL_STATE_TRUST_UNAUTHORIZED });
        }

        log("Init user data (refresh)", {userPersistedData});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!globalUserState.isTrustedData) {
        return <SuspenseLoader />;
    }

    return (
        <Routes isAuthorized={globalUserState.isAuthorized} />
    );
};

const App: FC = (): ReactElement => {
    const [globalUserState, setGlobalUserState] = useReducer(userReducer, initialGlobalUserState);
    const [globalUsersState, setGlobalUsersState] = useReducer(usersReducer, initialGlobalUsersState);

    log("App component");

    return (
        <UserContext.Provider value={{ globalUserState, setGlobalUserState }}>
            <UsersContext.Provider value={{ globalUsersState, setGlobalUsersState }}>
                <Suspense fallback={<SuspenseLoader />}>
                    <BrowserRouter>
                        <GlobalState />
                    </BrowserRouter>
                </Suspense>
            </UsersContext.Provider>
        </UserContext.Provider>
    );
};

export default App;