import React, {ReactElement} from "react";

import {mainRoutes, marketingSubMenu} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {brandsApiURI} from "../../../constants/apiURIConstants";
import CouponsTableList from "./CouponsTableList";

const CouponsListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: marketingSubMenu.subMenuLabel},
                    {label: mainRoutes.brands.title},
                ]}
            />

            <CouponsTableList
                fetchBrands
                showCreator
                brandsBaseUrl={brandsApiURI.index}
            />
        </>
    );
};

export default CouponsListPage;