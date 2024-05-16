import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import {shopsApiURI} from "../../constants/apiURIConstants";
import ShopsTableList from "../../components/tableList/shops/ShopsTableList";

const ShopsPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.shops.title} icon={mainRoutes.shops.icon} />
            <ShopsTableList
                fetchShops
                showCreator
                shopsBaseUrl={shopsApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addShop.path}
                >
                    Nouvelle boutique
                </Button>
            </ShopsTableList>
        </>
    );
};

export default ShopsPage;