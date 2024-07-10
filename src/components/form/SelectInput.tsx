import React, {ReactElement, FC, useState, useMemo} from "react";
import {Select, SingleValue} from "chakra-react-select";
import {SystemStyleObject} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const SelectInput: FC<SelectInputProps> = (
    {
        handleSelect,
        defaultValue,
        name,
        options
    }): ReactElement => {
    
    const {t} = useTranslation();
    const [value, setValue] = useState<SelectInputOptionType|undefined>(
        defaultValue ? ({label: t(defaultValue.label), value: defaultValue.value}) : undefined
    );

    const translatedOptions: Array<SelectInputOptionType> = useMemo(() => {
        return options.map((item: SelectInputOptionType) => ({
            label: t(item.label),
            value: item.value
        })); 
    }, [options, t]);

    return (
        <Select
            onChange={(v: SingleValue<SelectInputOptionType>): void => {
                if(v) {
                    setValue(v);
                    handleSelect(v.value);
                }
            }}
            value={value}
            useBasicStyles
            name={name}
            placeholder={t("chose")}
            selectedOptionStyle="check"
            options={translatedOptions}
            chakraStyles={{
                control: (provided: SystemStyleObject) => ({
                    ...provided,
                    borderColor: "gray.300",
                }),
                option: (provided: SystemStyleObject) => ({
                    ...provided,
                    _hover: {color: "purple.500"},
                    _focus: {color: "purple.500"},
                    _selected: {color: "purple.500"},
                }),
            }}
        />
    );
};

interface SelectInputProps {
    options: Array<SelectInputOptionType>,
    defaultValue?: SelectInputOptionType,
    name: string,
    handleSelect: (a: string) => void,
}

export interface SelectInputOptionType {
    label: string;
    value: string,
}

export default SelectInput;