import React, { ReactElement, FC } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {FiCheck} from "react-icons/fi";
import {FormikProps} from "formik";
import {useTranslation} from "react-i18next";

const DoubleSaveButton: FC<DoubleSaveButtonProps> = (
    {
        formikProps,
        handleSaveAndContinue,
        isLoading = false,
        isDisabled = false
    }): ReactElement => {

   const {t} = useTranslation();
   let isValid: boolean = false;

   if(formikProps) {
       isValid = formikProps.isValid && formikProps.dirty;
   }

   return (
        <ButtonGroup>
            <Button
                isLoading={isLoading}
                isDisabled={isDisabled}
                type='submit'
                leftIcon={<FiCheck />}
            >
                {t("save")}
            </Button>
            <Button
                variant={"outline"}
                isLoading={isLoading}
                isDisabled={isDisabled || !isValid}
                leftIcon={<FiCheck />}
                onClick={handleSaveAndContinue}
            >
                {t("save_and_continue")}
            </Button>
        </ButtonGroup>
    );
};

interface DoubleSaveButtonProps {
    isLoading?: boolean;
    isDisabled?: boolean;
    formikProps?: FormikProps<any>;
    handleSaveAndContinue: () => void;
}

export default DoubleSaveButton;