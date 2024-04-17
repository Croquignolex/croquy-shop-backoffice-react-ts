import React, { ReactElement } from "react";
import {Box} from "@chakra-ui/react";
import PageHeader from "../../components/menu/PageHeader";
import {mainRoutes} from "../../routes/mainRoutes";

const DashboardPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.dashboard.title} icon={mainRoutes.dashboard.icon}></PageHeader>
            <Box minH="100vh">
                DashboardPage
            </Box>
        </>
    );
};

export default DashboardPage;