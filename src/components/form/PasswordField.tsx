import React, { ReactElement, FC, useState } from "react";
import {
    Input, FormLabel, FormErrorMessage, FormControl,
    InputGroup, InputRightElement, Icon, IconButton
} from "@chakra-ui/react";
import { Field } from "formik";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

import { log } from "../../helpers/generalHelpers";
import { TextFieldProps } from "./TextField";

const PasswordField: FC<TextFieldProps> = ({ label, name, noLabel = false, isInvalid, errorMessage }): ReactElement => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    log("PasswordField component", {label, name, noLabel, isInvalid, errorMessage});

    return (
        <FormControl isInvalid={isInvalid} mb={6}>
            {!noLabel && <FormLabel fontSize='sm' fontWeight='normal'>{label}</FormLabel>}

            <InputGroup>
                <InputRightElement>
                    <IconButton
                        h='1.75rem'
                        variant="text"
                        aria-label={ showPassword ? 'Mask password' : 'Reveal password' }
                        icon={ showPassword ? <FiEyeOff /> : <FiEye /> }
                        onClick={ () => setShowPassword(!showPassword) }
                    />
                </InputRightElement>

                <Field as={Input} name={name} type={ showPassword ? 'text' : 'password' } size="md" borderColor="gray.300" />
            </InputGroup>

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} /> {errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export default PasswordField;