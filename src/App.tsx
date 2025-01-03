import React, {FC, ReactElement, Suspense, useContext, useReducer, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import {AbsoluteCenter, Box, Spinner} from "@chakra-ui/react";

import {Routes} from "./routes";
import {getLocaleStorageItem} from "./helpers/localStorageHelpers";
import {LoginResponseDataType} from "./pages/login/useLoginHook";
import useLocalizeDocumentAttributesHook from "./hooks/useLocalizeDocumentAttributesHook";
import {
    initialGlobalUserState,
    USER_GLOBAL_STATE_TRUST_UNAUTHORIZED,
    UserContext,
    USER_GLOBAL_STATE_TRUST_AUTHORIZED,
    userReducer,
    USER_GLOBAL_STATE_UPDATE_LOGIN_DATA
} from "./contexts/UserContext";

const SuspenseLoader: FC = (): ReactElement => {
    return (
        <Box position="relative" h="100vh">
            <AbsoluteCenter axis="both">
                <Spinner size="xl" />
            </AbsoluteCenter>
        </Box>
    );
};

const GlobalState: FC = (): ReactElement => {
    const { globalUserState, setGlobalUserState } = useContext(UserContext);
    useLocalizeDocumentAttributesHook();

    useEffect((): void => {
        const userPersistedData: any = getLocaleStorageItem("user");

        if(userPersistedData) {
            const data: LoginResponseDataType = userPersistedData;

            setGlobalUserState({ type: USER_GLOBAL_STATE_TRUST_AUTHORIZED });
            setGlobalUserState({ type: USER_GLOBAL_STATE_UPDATE_LOGIN_DATA, payload: data });
        } else {
            setGlobalUserState({ type: USER_GLOBAL_STATE_TRUST_UNAUTHORIZED });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!globalUserState.isTrustedData) {
        return (
            <SuspenseLoader />
        );
    }

    return (
        <Routes isAuthorized={globalUserState.isAuthorized} />
    );
};

const App: FC = (): ReactElement => {
    const [globalUserState, setGlobalUserState] = useReducer(userReducer, initialGlobalUserState);

    return (
        <UserContext.Provider value={{ globalUserState, setGlobalUserState }}>
            <Suspense fallback={<SuspenseLoader />}>
                <BrowserRouter>
                    <GlobalState />
                </BrowserRouter>
            </Suspense>
        </UserContext.Provider>
    );
};

export default App;