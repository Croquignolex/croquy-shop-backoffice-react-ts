import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Flex, Button, ButtonGroup} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditCouponHook from "./useEditCouponHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/PageHeader";
import {EditCouponFormType, EditCouponHookType, editCouponSchema} from "./editCouponData";
import NotFoundPage from "../../NotFoundPage";
import NumberField from "../../../components/form/NumerField";
import DateField from "../../../components/form/DateField";

const EditCouponPage = (): ReactElement => {
    const {
        editCouponAlertData,
        handleEditCoupon,
        couponResponseData,
        isCouponPending,
        couponAlertData,
        formCoupon,
        pageHeaderItems,
        isEditCouponPending
    }: EditCouponHookType = useEditCouponHook();

    return (
        <>
            {/*<PageHeader*/}
            {/*    title={`Modifier coupon ${couponResponseData.code}`}*/}
            {/*    items={pageHeaderItems}*/}
            {/*/>*/}
            <Container maxW={'3xl'}>
                <CustomAlert data={couponAlertData} />
                <CustomAlert data={editCouponAlertData} />
                {couponAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formCoupon} validationSchema={editCouponSchema} onSubmit={handleEditCoupon} enableReinitialize>
                            {(props: FormikProps<EditCouponFormType>) => (
                                <Form>
                                    <TextField label="Code" name="code" formikProps={props} disabled />
                                    <Flex>
                                        <NumberField label="Reduction (%)" name="discount" min={couponResponseData.discount} max={100} formikProps={props} />
                                        <NumberField label="Nombre d'utilisation" name="totalUse" min={couponResponseData.totalUse} formikProps={props} />
                                    </Flex>
                                    <Flex>
                                        <DateField label="Debut de promotion" name="promotionStartedAt" formikProps={props} />
                                        <DateField label="Fin de promotion" name="promotionEndedAt" formikProps={props} />
                                    </Flex>
                                    <TextareaField label="Description" name="description" formikProps={props} />
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditCouponPending}
                                            isDisabled={isCouponPending}
                                            type='submit'
                                            fontWeight="none"
                                            leftIcon={<FiCheck />}
                                        >
                                            Confirmer
                                        </Button>
                                    </ButtonGroup>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                )}
            </Container>
        </>
    );
};

export default EditCouponPage;