import React, {ReactElement} from "react";

import useUsersPageHook from "./useUsersPageHook";
import DataTable from "../../components/DataTable";

const UsersPage = (): ReactElement => {
    const { isPending, users, alertData } = useUsersPageHook();

    return (
        <>
            <DataTable
                alertData={alertData}
                isLoading={isPending}
                currentPage={2}
                pages={5}
                handleSearch={(e: string) => {console.log("Search", e)}}
                handleAddItem={() => {console.log("Add")}}
                handleNextPage={() => {console.log("next")}}
                handlePreviousPage={() => {console.log("previous")}}
                headers={["Nom", "Age", "Email", "bonon"]}
                data={[{nom: "Alex", age: "50", email: "tjnjn@ffff.fr"}, {nom: "Alex", age: "50", bonon: 95, email: "rfvr"}]}
            >
            </DataTable>
        </>
    );
};

export default UsersPage;