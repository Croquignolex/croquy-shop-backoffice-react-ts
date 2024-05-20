import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useCouponCreateFormHook from "./useCouponCreateFormHook";
import NumberField from "../../form/NumerField";
import DateField from "../../form/DateField";
import {
    CouponCreateFormHookType,
    CreateCouponFormType,
    createCouponInitialStaticValues,
    createCouponSchema
} from "./counponCreateFormData";

const CouponCreateForm: FC<CouponCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createCouponAlertData,
        handleCreateCoupon,
        handleCreateCouponAndContinue,
        sequence,
        isCreateCouponPending
    }: CouponCreateFormHookType = useCouponCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createCouponAlertData} />
            <Formik initialValues={createCouponInitialStaticValues} validationSchema={createCouponSchema} onSubmit={handleCreateCoupon}>
                {(props: FormikProps<CreateCouponFormType>) => (
                    <Form>
                        <TextField label="Code" name="code" formikProps={props} />
                        <Flex>
                            <NumberField label="Reduction (%)" name="discount" min={0} max={100} formikProps={props} />
                            <NumberField label="Nombre d'utilisation" name="totalUse" min={0} formikProps={props} />
                        </Flex>
                        <Flex>
                            <DateField label="Debut de promotion" name="promotionStartedAt" formikProps={props} />
                            <DateField label="Fin de promotion" name="promotionEndedAt" formikProps={props} />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateCouponPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateCouponAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface CouponCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default CouponCreateForm;