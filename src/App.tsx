import Company from "@/routes/company";
import Game from "@/routes/game";
import Home from "@/routes/home";
import queryClient from "@/services/react-query";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "@/components/error";
import RootLayout from "@/components/root-layout";
import Human from "./routes/human";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/game/:id",
        element: <Game />,
      },
      {
        path: "/company/:id",
        element: <Company />,
      },
      {
        path: "/humanCreator/:id",
        element: <Human />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
