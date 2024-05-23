import React, {FC, ReactElement} from "react";
import {Tbody, Table} from "@chakra-ui/react";

import ListSkeletonLoader from "./skeletonLoader/ListSkeletonLoader";

const SeoTable: FC<SeoTableProps> = ({isLoading, data}): ReactElement => {
    return (
        <Table size={"sm"}>
            <Tbody>
                <ListSkeletonLoader isLoading={isLoading} label={"Titre"}>{data.seoTitle}</ListSkeletonLoader>
                <ListSkeletonLoader isLoading={isLoading} label={"Description"}>{data.seoDescription}</ListSkeletonLoader>
            </Tbody>
        </Table>
    );
};

interface SeoTableProps {
    data: { seoTitle: string, seoDescription: string };
    isLoading: boolean;
}

export default SeoTable;