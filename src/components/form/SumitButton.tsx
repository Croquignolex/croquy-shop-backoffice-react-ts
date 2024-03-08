import React, { ReactElement, FC } from "react";
import { Button, Stack } from "@chakra-ui/react";

import { log } from "../../helpers/generalHelpers";

const SubmitButton: FC<FormSubmitButtonProps> = ({ label = 'Confirmer', colorScheme = 'blue', variant = 'solid', isLoading = false, isDisabled = false }): ReactElement => {
    log("SubmitButton component", {label, colorScheme, variant, isLoading, isDisabled});

    return (
        <Stack mt={10}>
            <Button
                colorScheme={colorScheme}
                variant={variant}
                isLoading={isLoading}
                isDisabled={isDisabled}
                type='submit'
                size='lg'
                rounded='full'
            >
                {label}
            </Button>
        </Stack>
    );
};

interface FormSubmitButtonProps {
    label?: string;
    colorScheme?: string,
    variant?: string,
    isLoading?: boolean;
    isDisabled?: boolean;
}

export default SubmitButton;