import React, {ReactElement} from "react";

import {ecommerceSubMenu, mainRoutes} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {attributesApiURI} from "../../../constants/apiURIConstants";
import AttributesTableList from "./AttributesTableList";

const AttributesListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: ecommerceSubMenu.subMenuLabel},
                    {label: mainRoutes.attributes.title},
                ]}
            />

            <AttributesTableList
                fetchAttributes
                showCreator
                attributesBaseUrl={attributesApiURI.index}
            />
        </>
    );
};

export default AttributesListPage;