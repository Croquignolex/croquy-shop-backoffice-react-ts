import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/PageHeader";
import {vendorsApiURI} from "../../constants/apiURIConstants";
import VendorsTableList from "../../components/tableList/vendors/VendorsTableList";

const VendorsPage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={mainRoutes.vendors.title} icon={mainRoutes.vendors.icon} />*/}
            <VendorsTableList
                fetchVendors
                showCreator
                vendorsBaseUrl={vendorsApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addVendor.path}
                >
                    Nouveau fournisseur
                </Button>
            </VendorsTableList>
        </>
    );
};

export default VendorsPage;