import React, {ReactElement} from "react";

import {mainRoutes, ecommerceSubMenu} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import CategoriesTableList from "./CategoriesTableList";

const CategoriesListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: ecommerceSubMenu.subMenuLabel},
                    {label: mainRoutes.categories.title},
                ]}
            />

            <CategoriesTableList
                fetchCategories
                showGroup
                showCreator
                categoriesBaseUrl={categoriesApiURI.index}
            />
        </>
    );
};

export default CategoriesListPage;