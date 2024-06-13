import React, { ReactElement, FC } from "react";
import {Flex, Icon, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FiEye, FiMoreVertical, FiToggleRight} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const MoreIconButton: FC<MoreIconButtonProps> = ({state, showStatusToggleModal, url, status}): ReactElement => {
    const {t} = useTranslation();

    const handleStatusToggleModal = (): void => {
        if(state) showStatusToggleModal(state)
        else showStatusToggleModal()
    }

   return (
       <Menu>
           <MenuButton
               border={0}
               _hover={{color: "black"}}
               _active={{color: "black"}}
           >
               <FiMoreVertical />
           </MenuButton>
           <MenuList shadow="default" rounded="lg">
               <MenuItem py={0} bg={"none"}>
                   <Flex
                       px={5}
                       py={2}
                       alignItems={"center"}
                       w={"full"}
                       as={Link}
                       to={url}
                       state={state}
                       _hover={{color: "purple.500"}}
                   >
                       <Icon mr="2" as={FiEye} fontSize={"lg"} />
                       {t("details")}
                   </Flex>
               </MenuItem>
               <MenuItem py={0} bg={"none"}>
                   <Flex
                       px={5}
                       py={2}
                       alignItems={"center"}
                       w={"full"}
                       _hover={{color: "purple.500"}}
                       onClick={handleStatusToggleModal}
                   >
                       <Icon mr="2" as={FiToggleRight} fontSize={"lg"} />
                       {t(`toggle_${status}`)}
                   </Flex>
               </MenuItem>
           </MenuList>
       </Menu>
    );
};

interface MoreIconButtonProps {
    showStatusToggleModal: (a?: any) => void;
    state: any;
    url: any;
    status: boolean;
}

export default MoreIconButton;