import React, {FC, ReactElement, ReactNode} from "react";
import { Box, Flex, Icon, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

const NavItem: FC<NavItemProps> = ({ icon, path, children, ...rest }): ReactElement => {
    return (
        <Box as={NavLink} to={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            {(props: any) => (
                <Flex
                    align="center"
                    p="3"
                    mr="4"
                    role="group"
                    cursor="pointer"
                    borderRightRadius={"md"}
                    _hover={{ background: props?.isActive ? '' : 'gray.100' }}
                    background={props.isActive ? 'green.500' : ''}
                    color={props.isActive ? 'white' : ''}
                    {...rest}
                >
                    { icon && (<Icon mr="4" as={icon} fontSize='1.3rem' />) }
                    {children}
                </Flex>
            )}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon?: IconType,
    path: string,
    children: ReactNode,
}

export default NavItem;