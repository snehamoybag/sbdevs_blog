import type { ReactElement } from "react";
import Main from "../components/Main";
import BlogPost from "../components/BlogPost";

interface IndexPageProps {}

export default function IndexPage({}: Readonly<IndexPageProps>): ReactElement {
  return (
    <Main>
      <BlogPost />
    </Main>
  );
}
