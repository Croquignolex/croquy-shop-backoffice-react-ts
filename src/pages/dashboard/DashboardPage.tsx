import React, { ReactElement } from "react";
import {Box} from "@chakra-ui/react";
import PageHeader from "../../components/menu/PageHeader";

const DashboardPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Tableau de board"}></PageHeader>
            <Box minH="100vh">
                DashboardPage
            </Box>
        </>
    );
};

export default DashboardPage;