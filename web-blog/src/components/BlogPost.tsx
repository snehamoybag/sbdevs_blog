import type { ReactElement } from "react";
import Title700 from "./partials/titles/Title700";
import placeholderImg from "../assets/images/placeholder.jpg";

// {
//   title: "Exploring Web Workers in React",
//   content:
//     "Ever wondered how to offload heavy computations from your React UI? Web Workers might be your best friend. In this post, we explore setup, communication, and real-world use cases.",
//   thumbnailUrl: "https://via.placeholder.com/640x360.png?text=Web+Workers",
//   createdAt: "2024-09-18T10:30:00Z",
//   updatedAt: "2025-01-12T14:05:00Z",
//   category: "web dev",
//   tags: ["React", "Performance", "Web Workers"],
//   author: {
//     id: 1,
//     name: "Snehamoy Roy",
//     bio: "Aspiring freelance developer focused on React and backend tools, with a soft spot for debugging TypeScript at midnight.",
//   },
//   count: {
//     likes: 24,
//     comments: 4,
//   },
//   userInteractions: {
//     like: false,
//     comment: false,
//   },
// }

interface BlogPostProps {
  // props
}

export default function BlogPost({}: Readonly<BlogPostProps>): ReactElement {
  return (
    <article className="grid gap-y-4 relative">
      <header className="pt-8">
        <Title700 as="h2">
          <a href="/blog/99">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut atque
            inventore quas! Unde, odit reprehenderit.
          </a>
        </Title700>
        <p className="flex items-center gap-1 text-red-400 mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            aria-hidden="true"
            className="fill-blue-400"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
          </svg>
          <a href="/profile/99" className="hover:underline">
            Snehamoy Bag
          </a>
          <span className="text-[hsla(0,0%,0%,0.5)]">on July 23, 2025</span>
        </p>
      </header>
      <a href="/blog/99">
        <img
          src={placeholderImg}
          alt=""
          className="aspect-video object-cover object-center rounded-2xl overflow-auto"
        />
      </a>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
        architecto, delectus tenetur dolor accusantium quia excepturi quidem
        minus soluta nemo numquam reprehenderit voluptas at aspernatur quisquam
        repellat, assumenda ipsum laudantium. Voluptas quo quod vitae deleniti
        odio architecto eius perferendis natus, sequi corrupti dolorem totam
        soluta illum, nesciunt ut praesentium. Impedit!
      </p>
      <p>
        <a
          href="/blog/99"
          className="font-bold underline underline-offset-4 hover:decoration-1 visited:text-[hsla(0,0%,0%,0.5)]"
        >
          Read more...
        </a>
      </p>

      <footer>
        <div className="flex items-center w-full absolute top-0 isolate">
          <p className="flex items-center gap-1 text-xs text-[hsla(0,0%,0%,0.75)] capitalize px-2 py-1 rounded-[100vh] border-solid border-1 border-[hsla(0,0%,0%,0.75)] absolute right-4 z-1 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
              aria-hidden="true"
              className="size-4 fill-current"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h420v-140H160v140Zm500 0h140v-360H660v360ZM160-460h420v-140H160v140Z" />
            </svg>
            <a href="/category/web-dev" className="flex hover:font-bold">
              <span className="sr-only block">category: </span>web dev
            </a>
          </p>
          <span className="block w-full border-t-solid border-t-1 border-t-[hsla(0,0%,0%,0.25)]"></span>
        </div>
      </footer>
    </article>
  );
}
