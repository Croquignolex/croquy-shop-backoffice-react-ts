import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button, Stack } from "@chakra-ui/react";

import useUsersPageHook from "./useUsersPageHook";
import DisplayAlert from "../../components/DisplayAlert";
import Loader from "../../components/Loader";
import SearchField from "../../components/form/SearchField";
import { log } from "../../helpers/generalHelpers";
import { mainRoutes } from "../../routes/mainRoutes";

const UsersPage = (): ReactElement => {
    const { isLoading, users, alertData } = useUsersPageHook();

    log("UsersPage component", {isLoading, users, alertData});

    return (
        <>
            <Stack>
                <Loader isLoading={isLoading} />
                <DisplayAlert data={alertData} />

                {/*<SimpleGrid columns={{ lg: 2, sm: 2}} spacing={4} mt={4}>
                    {accounts.map((account: AccountModelType): ReactElement => <AccountCard account={account} />)}
                </SimpleGrid>*/}
            </Stack>
        </>
    );
};

export default UsersPage;