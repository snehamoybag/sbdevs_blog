import type { ReactElement, ReactNode } from "react";

interface IconBubbleProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

export default function IconBubble({
  title,
  className,
  children,
}: Readonly<IconBubbleProps>): ReactElement {
  return (
    <div
      title={title}
      className={`flex items-center gap-0.5 text-[hsla(0,0%,0%,0.75)] capitalize px-2 py-1.5 border-solid border-1 border-current rounded-[100vh] hover:text-[hsla(0,0%,0%,1)] ${className ?? ""} `}
    >
      {children}
    </div>
  );
}
