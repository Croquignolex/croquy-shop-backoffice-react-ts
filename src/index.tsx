import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./assets/css/main.css";

import App from "./App";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // refetchOnWindowFocus: false,
            // staleTime: -1,
            retry: false
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


