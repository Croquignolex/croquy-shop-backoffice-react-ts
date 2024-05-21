import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import {brandsApiURI} from "../../constants/apiURIConstants";
import BrandsTableList from "../../components/tableList/brands/BrandsTableList";

const BrandsPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.brands.title} icon={mainRoutes.brands.icon} />
            <BrandsTableList
                fetchBrands
                showCreator
                brandsBaseUrl={brandsApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addBrand.path}
                >
                    Nouvelle marque
                </Button>
            </BrandsTableList>
        </>
    );
};

export default BrandsPage;