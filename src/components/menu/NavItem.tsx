import React, { FC, ReactElement } from "react";
import { Box, Flex, Icon, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

const NavItem: FC<NavItemProps> = ({ icon, path, isActive, children, ...rest }): ReactElement => {
    return (
        <Box as={Link} to={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{ fontSize: '1.1rem', color: 'black' }}
                color={isActive ? 'black' : 'gray'}
                fontSize={isActive ? '1.1rem' : '1rem'}
                {...rest}
            >
                { icon && (<Icon mr="4" as={icon} fontSize='1.3rem' />) }
                {children}
            </Flex>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType,
    path: string,
    isActive: boolean,
    children: React.ReactNode,
}

export default NavItem;