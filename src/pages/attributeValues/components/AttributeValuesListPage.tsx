import React, {ReactElement} from "react";

import {ecommerceSubMenu, mainRoutes} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {attributeValuesApiURI} from "../../../constants/apiURIConstants";
import AttributeValueValuesTableList from "./AttributeValuesTableList";

const AttributeValueValuesListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: ecommerceSubMenu.subMenuLabel},
                    {label: mainRoutes.attributeValues.title},
                ]}
            />

            <AttributeValueValuesTableList
                fetchAttributeValues
                showCreator
                attributeValuesBaseUrl={attributeValuesApiURI.index}
            />
        </>
    );
};

export default AttributeValueValuesListPage;