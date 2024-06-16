import {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {FiChevronDown} from "react-icons/fi";
import {IconLanguage} from "@tabler/icons-react";
import {Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup} from "@chakra-ui/react";

import {supportedLanguages} from "../i18n/config";
import useLocalizeDocumentAttributesHook from "../hooks/useLocalizeDocumentAttributesHook";

const LocaleSwitcher: FC = () => {
    const {i18n} = useTranslation();
    useLocalizeDocumentAttributesHook();

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant={"outline"}
                rightIcon={<FiChevronDown />}
                leftIcon={<IconLanguage />}
                w={150}
                border={0}
                color={"gray.600"}
                _hover={{color: "purple.500", bg: "gray.100"}}
                _active={{color: "purple.500", bg: "purple.100"}}
            >
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
                            _hover={{color: "purple.500"}}
                            color={(i18n.resolvedLanguage === code) ? "purple.500" : ""}
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