import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider, extendTheme, Input} from "@chakra-ui/react";
import {Dict} from "@chakra-ui/utils";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

import "./assets/css/main.css";

import App from "./App";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 0,
            // cacheTime: 0,
        },
    },
});

const theme: Dict = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#f8f7fa",
                color: "gray.600",
            },
        },
    },
    fonts: {
        heading: `"Public Sans", sans-serif`,
        body: `"Public Sans", sans-serif`,
    },
    shadows: {
        default: '0 .25rem 1.125rem rgba(75, 70, 92, .1)',
    },
    components: {
        FormLabel: {
            baseStyle: {
                fontWeight: "normal",
                fontSize: "sm"
            }
        },
        Input: {
            _hover: {
                bg: 'red',
            },
        }
    },
});

root.render(
    // <React.StrictMode>
        <ChakraProvider theme={theme} toastOptions={{defaultOptions: {position: "top"}}}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ChakraProvider>
   // </React.StrictMode>
);


