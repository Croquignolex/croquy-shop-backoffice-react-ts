import React, {ReactElement, FC, useState, ChangeEvent} from "react";
import { Input, InputGroup, InputLeftElement, IconButton } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import { log } from "../../helpers/generalHelpers";

const SearchField: FC<SearchFieldProps> = ({ handleSearch = (): void => {} }): ReactElement => {
    log("SearchField component", {handleSearch});

    const [needle, setNeedle] = useState<string>("");

    const handleNeedle = (e: ChangeEvent<HTMLInputElement>): void => {
        setNeedle(e.target.value);
    }

    return (
        <InputGroup>
            <InputLeftElement>
                <IconButton
                    h='1.75rem'
                    variant="text"
                    aria-label="search"
                    icon={ <FiSearch /> }
                    onClick={() => handleSearch(needle)}
                />
            </InputLeftElement>

            <Input type='text' size="md" placeholder="Rechercher..." value={needle} onChange={handleNeedle} />

        </InputGroup>
    );
};

interface SearchFieldProps {
    handleSearch?: (a: string) => void,
}

export default SearchField;