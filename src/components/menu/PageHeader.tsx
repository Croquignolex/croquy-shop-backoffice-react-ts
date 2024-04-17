import React, { FC } from "react";
import {Heading, Icon} from "@chakra-ui/react";

import PageBreadcrumb, {BreadcrumbItemsType} from "./PageBreadcrumb";
import { IconType } from "react-icons";

const PageHeader: FC<PageHeaderProps> = ({title= "", icon, items = []}) => {
    return (
        <>
            <PageBreadcrumb pageTitle={title} items={items} />
            <Heading as='h1' pt={2} pb={4} fontSize={"xl"}>
                {icon && (
                    <Icon mr="4" as={icon} fontSize='1.3rem' color={"green.500"} />
                )}
                {title}
            </Heading>
        </>
    );
};

interface PageHeaderProps {
    icon?: IconType,
    title?: string,
    items?: Array<BreadcrumbItemsType>,
}

export default PageHeader;