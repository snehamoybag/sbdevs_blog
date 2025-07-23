import type { ReactElement, ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  id?: string;
  name?: string;
  value?: string;
  title?: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function Button({
  type = "button",
  id,
  name,
  value,
  title,
  className,
  onClick,
  children,
}: Readonly<ButtonProps>): ReactElement {
  return (
    <button
      type={type}
      id={id ?? ""}
      name={name ?? ""}
      value={value ?? ""}
      title={title ?? ""}
      className={className || ""}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
