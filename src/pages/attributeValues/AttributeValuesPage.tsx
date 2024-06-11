import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/PageHeader";
import {attributeValuesApiURI} from "../../constants/apiURIConstants";
import AttributeValuesTableList from "../../components/tableList/attributeValues/AttributeValuesTableList";

const AttributeValuesPage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={mainRoutes.attributeValues.title} icon={mainRoutes.attributeValues.icon} />*/}
            <AttributeValuesTableList
                fetchAttributeValues
                showCreator
                attributeValuesBaseUrl={attributeValuesApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addAttributeValue.path}
                >
                    Nouvelle valeur d'attribut
                </Button>
            </AttributeValuesTableList>
        </>
    );
};

export default AttributeValuesPage;