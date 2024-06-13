import React, {FC, ReactElement} from "react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text} from "@chakra-ui/react";
import {FiChevronRight} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const PageHeader: FC<{breadcrumb: Array<BreadcrumbItemsType>}> = ({breadcrumb = []}): ReactElement => {
    const {t} = useTranslation();

    return (
        <Flex alignItems={"center"} h="10vh" >
            <Breadcrumb spacing={2} separator={<FiChevronRight />} fontSize={"lg"}>
                {breadcrumb.map((item: BreadcrumbItemsType, index: number): ReactElement => {
                    const label: string = item.label;

                    if(index === 0) {
                        return (
                            <BreadcrumbItem key={index}>
                                <Text color={"gray.400"}>
                                    {t(label)}
                                </Text>
                            </BreadcrumbItem>
                        );
                    } else if(index === (breadcrumb.length - 1)) {
                       return (
                           <BreadcrumbItem isCurrentPage key={index}>
                               <BreadcrumbLink>
                                   {t(label)}
                               </BreadcrumbLink>
                           </BreadcrumbItem>
                       );
                    } else {
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink
                                    as={Link}
                                    to={item.path}
                                    state={item.state}
                                    _hover={{color: "purple.500", textDecoration: "none"}}
                                    color={"gray.500"}
                                >
                                    {t(label)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        );
                    }
                })}
            </Breadcrumb>
        </Flex>
    );
};

interface BreadcrumbItemsType {
    path?: string,
    label: string,
    state?: any,
}

export default PageHeader;