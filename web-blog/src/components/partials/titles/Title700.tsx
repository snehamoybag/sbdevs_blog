import type { JSX, ReactElement, ReactNode } from "react";

interface Title700Props {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
}

export default function Title700({
  as: Tag = "h1",
  className,
  children,
}: Readonly<Title700Props>): ReactElement {
  return (
    <Tag className={`text-4xl font-bold leading-[1] ${className}`}>
      {children}
    </Tag>
  );
}
