import type { JSX, ReactElement } from "react";

interface Paragraph400Props {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: string;
}

export default function Paragraph400({
  as: Tag = "p",
  className,
  children,
}: Readonly<Paragraph400Props>): ReactElement {
  return <Tag className={`${className || ""}`}>{children}</Tag>;
}
