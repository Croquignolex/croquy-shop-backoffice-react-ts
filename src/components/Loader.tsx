import React, { FC, ReactElement } from "react";
import { Center, Spinner } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";

const Loader: FC<LoaderProps> = ({ isLoading, center = true }): ReactElement | null => {
    if(!isLoading) {
        return null;
    }

    log("Loader component", {isLoading, center});

    if(center) {
        return (
            <Center>
                <Spinner color='orange' />
            </Center>
        )
    }

    return (
        <Spinner color='orange' />
    );
};

interface LoaderProps {
    isLoading: boolean
    center?: boolean,
}

export default Loader;