import React, { ReactElement, FC } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {FiCheck} from "react-icons/fi";
import {FormikProps} from "formik";

const DoubleSaveButton: FC<DoubleSaveButtonProps> = ({ isLoading = false, isDisabled = false,
                                                         formikProps, handleSaveAndContinue }): ReactElement => {
   let isValid: boolean = false;

   if(formikProps) {
       isValid = formikProps.isValid && formikProps.dirty;
   }

   return (
        <ButtonGroup>
            <Button
                colorScheme={"orange"}
                variant={"solid"}
                isLoading={isLoading}
                isDisabled={isDisabled}
                type='submit'
                size='md'
                fontWeight="none"
                leftIcon={<FiCheck />}
            >
                Confirmer
            </Button>
            <Button
                colorScheme={"blue"}
                variant={"solid"}
                isLoading={isLoading}
                isDisabled={isDisabled || !isValid}
                type='button'
                size='md'
                fontWeight="none"
                leftIcon={<FiCheck />}
                onClick={handleSaveAndContinue}
            >
                Confirmer et continuer
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