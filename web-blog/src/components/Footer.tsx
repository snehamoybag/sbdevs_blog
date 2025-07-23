import type { ReactElement } from "react";
import Paragraph400 from "./partials/paragraphs/Paragraph400";

interface FooterProps {}

export default function Footer({}: Readonly<FooterProps>): ReactElement {
  return (
    <footer className="mt-4">
      <Paragraph400>Build by Snehamoy Bag</Paragraph400>
    </footer>
  );
}
