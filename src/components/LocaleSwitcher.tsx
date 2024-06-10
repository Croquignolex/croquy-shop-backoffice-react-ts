import {useTranslation} from "react-i18next";
import {FiChevronDown} from "react-icons/fi";
import {IconLanguage} from '@tabler/icons-react';
import {Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup} from "@chakra-ui/react";
import {FC, ReactElement} from "react";

import {supportedLanguages} from "../i18n/config";

const LocaleSwitcher: FC = () => {
    const {i18n} = useTranslation();

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<FiChevronDown />} leftIcon={<IconLanguage />} w={150} border={0}>
                {supportedLanguages.find((lang): boolean => lang.code === i18n.resolvedLanguage)?.label}
            </MenuButton>
            <MenuList shadow="default" rounded="lg" minW={150}>
                <MenuOptionGroup defaultValue={i18n.resolvedLanguage}>
                    {supportedLanguages.map(({code, label}, index: number): ReactElement => (
                        <MenuItemOption
                            value={code}
                            onClick={() => i18n.changeLanguage(code)}
                            key={index}
                            bg="none"
                            _hover={{fontWeight: (i18n.resolvedLanguage === code) ? "" : "bold"}}
                        >
                            {label}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};

export default LocaleSwitcher;