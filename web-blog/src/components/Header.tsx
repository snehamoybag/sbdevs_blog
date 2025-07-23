import type { ReactElement } from "react";
import Logo from "./Logo";
import Button from "./partials/Button";

interface HeaderProps {}

export default function Header({}: Readonly<HeaderProps>): ReactElement {
  const buttonStyleTailwind = "hover:cursor-pointer";
  const iconStyleTailwind = "size-6 fill-black";

  return (
    <header className="flex flex-wrap justify-between items-center gap-4 p-4">
      <div className="flex flex-wrap justify-start items-center gap-2">
        <Logo />
        <Button
          title="Toggle dark mode"
          className={`${buttonStyleTailwind} self-start`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            className={`${iconStyleTailwind} opacity-50 hover:opacity-100 focus:opacity-100`}
          >
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </svg>
        </Button>
      </div>
      <div className="flex flex-wrap justify-end items-center gap-4">
        <Button title="Search" className={buttonStyleTailwind}>
          <span className="sr-only">open search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            aria-hidden="false"
            className={iconStyleTailwind}
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </Button>
        <Button title="Login" className={buttonStyleTailwind}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            aria-hidden="true"
            className={iconStyleTailwind}
          >
            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
          </svg>
        </Button>
      </div>
      {/* dropdown navbar */}
    </header>
  );
}
