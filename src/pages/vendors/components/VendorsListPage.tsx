import React, {ReactElement} from "react";

import {administrationSubMenu, mainRoutes} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import VendorsTableList from "./VendorsTableList";

const VendorsListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: administrationSubMenu.subMenuLabel},
                    {label: mainRoutes.vendors.title},
                ]}
            />

            <VendorsTableList
                fetchVendors
                showCreator
                vendorsBaseUrl={vendorsApiURI.index}
            />
        </>
    );
};

export default VendorsListPage;