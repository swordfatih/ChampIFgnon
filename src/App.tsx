import Company from "@/routes/company";
import Game from "@/routes/game";
import Home from "@/routes/home";
import Person from "@/routes/person";
import Quiz from "@/routes/quiz";
import queryClient from "@/services/react-query";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "@/components/error";
import PageLayout from "@/components/page-layout";
import RootLayout from "@/components/root-layout";

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
        path: "/quiz",
        element: <Quiz />,
      },
      {
        element: <PageLayout />,
        children: [
          {
            path: "/game/:id",
            element: <Game />,
          },
          {
            path: "/company/:id",
            element: <Company />,
          },
          {
            path: "/person/:id",
            element: <Person />,
          },
        ],
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
