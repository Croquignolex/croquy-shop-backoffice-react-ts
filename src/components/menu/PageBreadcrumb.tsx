import React, { FC, ReactElement } from "react";
import { FiChevronRight } from "react-icons/fi";
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BreadcrumbItemsType } from "../../types/otherTypes";

const PageBreadcrumb: FC<PageBreadcrumbProps> = ({ pageTitle, items }) => {
    return (
        <Breadcrumb spacing='8px' separator={<FiChevronRight />} mb={4}>
            {items.map((item: BreadcrumbItemsType): ReactElement => (
                <BreadcrumbItem key={item.key}>
                    <BreadcrumbLink as={Link} to={item.path}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
            ))}
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{pageTitle}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    );
};

interface PageBreadcrumbProps {
    pageTitle: string,
    items: BreadcrumbItemsType[],
}

export default PageBreadcrumb;