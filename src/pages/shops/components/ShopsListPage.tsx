import React, {ReactElement} from "react";

import {administrationSubMenu, mainRoutes} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import ShopsTableList from "./ShopsTableList";

const ShopsListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: administrationSubMenu.subMenuLabel},
                    {label: mainRoutes.shops.title},
                ]}
            />

            <ShopsTableList
                fetchShops
                showCreator
                shopsBaseUrl={shopsApiURI.index}
            />
        </>
    );
};

export default ShopsListPage;