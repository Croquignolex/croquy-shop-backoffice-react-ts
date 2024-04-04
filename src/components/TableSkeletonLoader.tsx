import React, { FC, ReactElement } from "react";
import {Tr, Td, Skeleton} from "@chakra-ui/react";

const TableSkeletonLoader: FC = (): ReactElement => {
    return (
        <>
            {Array(10).fill('30px').map((item: number, index: number): ReactElement => (
                <Tr key={index}>
                    <Td colSpan={10}>
                        <Skeleton height={item} />
                    </Td>
                </Tr>
            ))}
        </>
    )
};


export default TableSkeletonLoader;