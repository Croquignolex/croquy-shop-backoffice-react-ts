import React, {ReactElement} from "react";

import {mainRoutes, marketingSubMenu} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {brandsApiURI} from "../../../constants/apiURIConstants";
import BrandsTableList from "./BrandsTableList";

const BrandsListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: marketingSubMenu.subMenuLabel},
                    {label: mainRoutes.brands.title},
                ]}
            />

            <BrandsTableList
                fetchBrands
                showCreator
                brandsBaseUrl={brandsApiURI.index}
            />
        </>
    );
};

export default BrandsListPage;