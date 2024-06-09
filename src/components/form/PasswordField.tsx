import React, { ReactElement, FC, useState } from "react";
import { Field } from "formik";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import {
    Input,
    FormLabel,
    FormErrorMessage,
    FormControl,
    InputGroup,
    InputRightElement,
    Icon,
    IconButton, Skeleton
} from "@chakra-ui/react";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";

const PasswordField: FC<DefaultFieldProps> = (
    {
        name,
        label,
        isLoading = false,
        formikProps,
    }): ReactElement => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isInvalid: boolean = !!formikProps.errors[name] && !!formikProps.touched[name];

    return (
        <FormControl isInvalid={isInvalid} mb={4} px={1} variant="floating">
            <FormLabel fontSize="sm" fontWeight="normal">{label}</FormLabel>

            {isLoading
                ? <Skeleton height={"40px"} width={"100%"} rounded={"md"} mb={4} />
                : (
                    <InputGroup>
                        <Field as={Input} name={name} type={showPassword ? "text" : "password"}  borderColor="gray.300" />
                        
                        <InputRightElement>
                            <IconButton
                                h="1.75rem"
                                variant="text"
                                aria-label={ showPassword ? "Mask password" : "Reveal password" }
                                icon={ showPassword ? <FiEyeOff /> : <FiEye /> }
                                onClick={ () => setShowPassword(!showPassword) }
                            />
                        </InputRightElement> 
                    </InputGroup>
                )
            }

            <FormErrorMessage>
                <Icon mr="2" as={FiAlertCircle} />
                {formikProps.errors[name]?.toString()}
            </FormErrorMessage>
        </FormControl>
    );
};

export default PasswordField;