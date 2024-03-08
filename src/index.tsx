import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./App";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 0
        },
    },
});

const theme: Dict = extendTheme({
    fonts: {
        heading: `'Public Sans', sans-serif`,
        body: `'Public Sans', sans-serif`,
    },
});

root.render(
    // <React.StrictMode>
        <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top' } }}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ChakraProvider>
   // </React.StrictMode>
);


