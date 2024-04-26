import React, {ReactElement} from "react";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import StatesTableList from "../../components/tableList/states/StatesTableList";
import {statesApiURI} from "../../constants/apiURIConstants";

const StatesPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.states.title} icon={mainRoutes.states.icon} />
            <StatesTableList
                fetchStates
                showCountry
                addStatePath={mainRoutes.addState.path}
                statesBaseUrl={statesApiURI.index}
            />
        </>
    );
};

export default StatesPage;