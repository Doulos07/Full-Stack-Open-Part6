import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenssageContextProvide } from "./anecdotesContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <MenssageContextProvide>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MenssageContextProvide>,
);
