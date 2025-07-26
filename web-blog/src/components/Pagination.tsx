import type { ReactElement } from "react";
import IconBubble from "./partials/IconBubble";

interface PaginationProps {
  // props
}

export default function Pagination({}: Readonly<PaginationProps>): ReactElement {
  const bubbleStyleTailwind = "py-2";
  const iconStyleTailwind = "size-8 fill-current";

  return (
    <div className="flex justify-center items-center gap-4">
      <a href="/prev">
        <IconBubble className={`${bubbleStyleTailwind} pr-5`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            aria-hidden="true"
            className={iconStyleTailwind}
          >
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
          <span className="block">Prev</span>
        </IconBubble>
      </a>
      <a href="/next">
        <IconBubble className={`${bubbleStyleTailwind} pl-5`}>
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            aria-hidden="true"
            className={iconStyleTailwind}
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </IconBubble>
      </a>
    </div>
  );
}
