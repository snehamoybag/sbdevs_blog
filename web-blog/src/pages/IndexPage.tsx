import type { ReactElement } from "react";
import Main from "../components/Main";

interface IndexPageProps {}

export default function IndexPage({}: Readonly<IndexPageProps>): ReactElement {
  return (
    <Main>
      <h1>Hello world from index page</h1>
    </Main>
  );
}
