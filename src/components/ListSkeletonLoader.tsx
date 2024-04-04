import React, {FC, ReactElement, ReactNode} from "react";
import {Tr, Td, SkeletonText} from "@chakra-ui/react";

const ListSkeletonLoader: FC<ListSkeletonLoaderProps> = ({label, children, isLoading}): ReactElement => {
    return (
        <Tr>
            <Td fontWeight={"bold"} textAlign={"right"} w={"20%"}>{label}</Td>
            <Td>{isLoading ? <SkeletonText noOfLines={1} w={"80%"}/> : children}</Td>
        </Tr>
    )
};

interface ListSkeletonLoaderProps {
    label: string
    isLoading: boolean,
    children: ReactNode
}

export default ListSkeletonLoader;