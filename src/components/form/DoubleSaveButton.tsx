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
                colorScheme={"green"}
                isLoading={isLoading}
                isDisabled={isDisabled}
                type='submit'
                fontWeight="none"
                leftIcon={<FiCheck />}
            >
                Confirmer
            </Button>
            <Button
                colorScheme={"orange"}
                isLoading={isLoading}
                isDisabled={isDisabled || !isValid}
                type='button'
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