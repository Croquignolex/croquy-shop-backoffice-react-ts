import React, {ReactElement, FC, useState, ChangeEvent, KeyboardEvent} from "react";
import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from "@chakra-ui/react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchField: FC<SearchFieldProps> = ({ handleSearch = (): void => {} }): ReactElement => {
    const [needle, setNeedle] = useState<string>("");

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleSearch(needle);
        }
    }

    const handleNeedle = (e: ChangeEvent<HTMLInputElement>): void => {
        setNeedle(e.target.value);
    }

    const handleClearNeedle = (): void => {
        setNeedle("");
        handleSearch("")
    }

    return (
        <InputGroup>
            <InputLeftElement>
                <IconButton
                    h="1.75rem"
                    variant="text"
                    aria-label="search"
                    icon={ <FiSearch /> }
                    onClick={() => handleSearch(needle)}
                />
            </InputLeftElement>

            <Input
                type="text"
                size="md"
                placeholder="Rechercher..."
                value={needle}
                onKeyUp={handleKeyPress}
                onChange={handleNeedle}
            />

            {(needle !== "") && (
                <InputRightElement>
                    <IconButton
                        h="1.75rem"
                        variant="text"
                        aria-label="search"
                        icon={ <FiX /> }
                        onClick={handleClearNeedle}
                    />
                </InputRightElement>
            )}
        </InputGroup>
    );
};

interface SearchFieldProps {
    handleSearch?: (a: string) => void,
}

export default SearchField;