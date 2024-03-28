import React, { FC } from "react";
import {Heading} from "@chakra-ui/react";

import PageBreadcrumb, {BreadcrumbItemsType} from "./PageBreadcrumb";

const PageHeader: FC<PageHeaderProps> = ({ title, items = [] }) => {
    return (
        <>
            <PageBreadcrumb pageTitle={title} items={items} />
            <Heading as='h1' pt={2} pb={4} fontSize={"xl"}>{title}</Heading>
        </>
    );
};

interface PageHeaderProps {
    title: string,
    items?: Array<BreadcrumbItemsType>,
}

export default PageHeader;