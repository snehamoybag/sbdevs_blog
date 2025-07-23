import type { ReactElement } from "react";
import Main from "./Main";
import Title700 from "./partials/titles/Title700";
import Paragraph400 from "./partials/paragraphs/Paragraph400";

interface ErrorElementProps {
  name: string;
  message: string;
  code: string | number;
}

export default function ErrorElement({
  name = "Internal Server",
  message = "An unknown internal server error has occured, please try again later.",
  code = 500,
}: Readonly<ErrorElementProps>): ReactElement {
  return (
    <Main>
      <Title700 as="h1">
        Error {code}: {name}
      </Title700>
      <Paragraph400 as="p">{message}</Paragraph400>
    </Main>
  );
}
