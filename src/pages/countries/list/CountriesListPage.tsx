import React, {ReactElement} from "react";
import {Box, Button, Stack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

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
                    {label: mainRoutes.countries.title},
                ]}
            />
            <Box py={4} rounded="lg" shadow="default" bg="white" overflow={"scroll"}>
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