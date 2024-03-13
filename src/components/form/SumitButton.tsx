import React, { ReactElement, FC } from "react";
import { Button, Stack } from "@chakra-ui/react";

const SubmitButton: FC<FormSubmitButtonProps> = ({ label = 'Confirmer', colorScheme = 'orange', variant = 'solid', isLoading = false, isDisabled = false }): ReactElement => {
    return (
        <Stack>
            <Button
                colorScheme={colorScheme}
                variant={variant}
                isLoading={isLoading}
                isDisabled={isDisabled}
                type='submit'
                size='md'
                fontWeight="none"
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