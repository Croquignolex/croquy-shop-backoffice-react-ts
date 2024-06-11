import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/PageHeader";
import CouponCreateForm from "../../components/createForm/coupon/CouponCreateForm";

const CreateCouponPage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={"Nouveau coupon"} items={[{path: mainRoutes.coupons.path, label: 'Coupons'}]} />*/}
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <CouponCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateCouponPage;