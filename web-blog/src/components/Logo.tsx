import type { ReactElement } from "react";

interface LogoProps {}

export default function Logo({}: Readonly<LogoProps>): ReactElement {
  return (
    <h2 className="font-(family-name:--ff-logo) font-bold text-3xl">
      <a href="/">
        <span className="sr-only">home</span>
        <span aria-hidden="true" className="uppercase">
          SB_Blogs
        </span>
      </a>
    </h2>
  );
}
