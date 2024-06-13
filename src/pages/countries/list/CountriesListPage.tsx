import React, {ReactElement} from "react";
import {Box} from "@chakra-ui/react";

import {mainRoutes, settingsSubMenu} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import CountriesTableList from "./table/CountriesTableList";

const CountriesListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: settingsSubMenu.subMenuLabel},
                    {label: settingsSubMenu.subMenuLabel},
                    {label: mainRoutes.countries.title},
                ]}
            />

            <Box py={4} rounded="lg" shadow="default" bg="white">
                <CountriesTableList
                    fetchCountries
                    showCreator
                    countriesBaseUrl={countriesApiURI.index}
                />
            </Box>
        </>
    );
};

export default CountriesListPage;