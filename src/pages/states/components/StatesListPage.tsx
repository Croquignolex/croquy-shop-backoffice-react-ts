import React, {ReactElement} from "react";

import {mainRoutes, settingsSubMenu} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {statesApiURI} from "../../../constants/apiURIConstants";
import StatesTableList from "./StatesTableList";

const StatesListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: settingsSubMenu.subMenuLabel},
                    {label: mainRoutes.states.title},
                ]}
            />

            <StatesTableList
                fetchStates
                showCountry
                showCreator
                statesBaseUrl={statesApiURI.index}
            />
        </>
    );
};

export default StatesListPage;