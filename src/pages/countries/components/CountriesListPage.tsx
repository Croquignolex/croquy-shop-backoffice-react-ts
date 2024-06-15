import React, {ReactElement} from "react";

import {mainRoutes, settingsSubMenu} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import CountriesTableList from "./CountriesTableList";

const CountriesListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: settingsSubMenu.subMenuLabel},
                    {label: mainRoutes.countries.title},
                ]}
            />

            <CountriesTableList
                fetchCountries
                showCreator
                countriesBaseUrl={countriesApiURI.index}
            />
        </>
    );
};

export default CountriesListPage;