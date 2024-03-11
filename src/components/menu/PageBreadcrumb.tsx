import React, { FC, ReactElement } from "react";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BreadcrumbItemsType } from "../../types/otherTypes";
import { log } from "../../helpers/generalHelpers";
import { mainRoutes } from "../../routes/mainRoutes";

const PageBreadcrumb: FC<PageBreadcrumbProps> = ({ pageTitle, items }) => {
    log("PageBreadcrumb component", {pageTitle, items});

    return (
        <Breadcrumb spacing='8px' separator={<FiChevronRight />} mb={4}>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={mainRoutes.dashboard.path} color={"orange.500"}>
                    <FiHome />
                </BreadcrumbLink>
            </BreadcrumbItem>
            {items.map((item: BreadcrumbItemsType): ReactElement => (
                <BreadcrumbItem key={item.key}>
                    <BreadcrumbLink as={Link} to={item.path} color={"orange.500"}>
                        {item.label}
                    </BreadcrumbLink>
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