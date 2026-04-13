// src/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Tắt retry cho tất cả useQuery
            refetchOnWindowFocus: false,
        },
    },
});

export default queryClient;
