import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import {couponsApiURI} from "../../constants/apiURIConstants";
import CouponsTableList from "../../components/tableList/coupons/CouponsTableList";

const CouponsPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.coupons.title} icon={mainRoutes.coupons.icon} />
            <CouponsTableList
                fetchCoupons
                showCreator
                couponsBaseUrl={couponsApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addCoupon.path}
                >
                    Nouveau coupon
                </Button>
            </CouponsTableList>
        </>
    );
};

export default CouponsPage;