import React, {FC, ReactElement} from "react";
import {Center, Spinner} from "@chakra-ui/react";

const Loader: FC<LoaderProps> = ({center = true}): ReactElement => {
    if(center) {
        return (
            <Center>
                <Spinner color="purple" />
            </Center>
        )
    }

    return (
        <Spinner color="purple" />
    );
};

interface LoaderProps {
    center?: boolean,
}

export default Loader;