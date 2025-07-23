import type { RouteObject } from "react-router";
import Root from "./Root";
import IndexPage from "./pages/IndexPage";
import ErrorElement from "./components/ErrorElement";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: IndexPage,
      },

      //   handle 404
      {
        path: "*",
        Component: () => (
          <ErrorElement
            name="Not Found."
            message="Page not found."
            code={404}
          />
        ),
      },
    ],
  },
];

export default routes;
