import React, { ReactElement, FC, useState } from "react";
import {
    Input, FormLabel, FormErrorMessage, FormControl,
    InputGroup, InputRightElement, Icon, IconButton
} from "@chakra-ui/react";
import { Field } from "formik";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

import { FormFieldProps } from "../../types/otherTypes";
import { log } from "../../helpers/generalHelpers";

const PasswordField: FC<FormFieldProps> = ({ label, name, noLabel = false, isInvalid, errorMessage }): ReactElement => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    log("PasswordField component", {label, name, noLabel, isInvalid, errorMessage});

    return (
        <FormControl isInvalid={isInvalid} mb={6}>
            {!noLabel && <FormLabel fontSize='md' fontWeight='normal'>{label}</FormLabel>}

            <InputGroup>
                <InputRightElement>
                    <IconButton
                        h='1.75rem'
                        mt={2}
                        variant="text"
                        aria-label={ showPassword ? 'Mask password' : 'Reveal password' }
                        icon={ showPassword ? <FiEyeOff /> : <FiEye /> }
                        onClick={ () => setShowPassword(!showPassword) }
                    />
                </InputRightElement>

                <Field as={Input} name={name} type={ showPassword ? 'text' : 'password' } size='lg' borderColor="black" rounded='lg' />
            </InputGroup>

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} /> {errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export default PasswordField;