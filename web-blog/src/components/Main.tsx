import type { ReactElement, ReactNode } from "react";

interface MainProps {
  children?: ReactNode;
  className?: string;
}

export default function Main({
  className,
  children,
}: Readonly<MainProps>): ReactElement {
  return (
    <main className={`min-h-full px-4 mt-4 ${className}`}>{children}</main>
  );
}
