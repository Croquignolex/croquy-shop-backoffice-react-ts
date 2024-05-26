import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import {attributesApiURI} from "../../constants/apiURIConstants";
import AttributesTableList from "../../components/tableList/attributes/AttributesTableList";

const AttributesPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.attributes.title} icon={mainRoutes.attributes.icon} />
            <AttributesTableList
                fetchAttributes
                showCreator
                attributesBaseUrl={attributesApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addAttribute.path}
                >
                    Nouvel attribut
                </Button>
            </AttributesTableList>
        </>
    );
};

export default AttributesPage;