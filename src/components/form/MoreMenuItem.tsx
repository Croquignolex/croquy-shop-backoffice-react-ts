import React, { ReactElement, FC } from "react";
import {Flex, Icon, MenuItem} from "@chakra-ui/react";

const MoreMenuItem: FC<MoreMenuItemProps> = ({showDrawer, label, icon}): ReactElement => {
   return (
       <MenuItem py={0} bg={"none"}>
           <Flex
               px={4}
               py={2}
               alignItems={"center"}
               w={"full"}
               _hover={{color: "purple.500"}}
               onClick={showDrawer}
           >
               <Icon mr="2" as={icon} fontSize={"lg"} />
               {label}
           </Flex>
       </MenuItem>
    );
};

interface MoreMenuItemProps {
    showDrawer: () => void;
    icon: any;
    label: string;
}

export default MoreMenuItem;