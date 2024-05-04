import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import {countriesApiURI} from "../../constants/apiURIConstants";
import CountriesTableList from "../../components/tableList/countries/CountriesTableList";

const CountriesPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.countries.title} icon={mainRoutes.countries.icon} />
            <CountriesTableList
                fetchCountries
                showCreator
                countriesBaseUrl={countriesApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addCountry.path}
                >
                    Nouveau pays
                </Button>
            </CountriesTableList>
        </>
    );
};

export default CountriesPage;