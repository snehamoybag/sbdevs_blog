import type { ReactElement } from "react";
import type { Blog } from "../types/Blog";
import Title700 from "./partials/titles/Title700";
import IconBubble from "./partials/IconBubble";

interface BlogPostProps extends Omit<Blog, "imageUrls" | "date"> {
  thumbnailUrl: string;
  createdAt: string;
}

export default function BlogPost({
  id,
  title,
  content,
  thumbnailUrl,
  category,
  createdAt,
  author,
  interactionsCount,
  userInteractions,
}: Readonly<BlogPostProps>): ReactElement {
  const maxTitleChars = 70;
  const maxContentChars = 200;

  const trimmedTitle =
    title.length > maxTitleChars
      ? title.slice(0, maxTitleChars) + "..."
      : title;

  const trimedContent =
    content.length > maxContentChars
      ? content.slice(0, maxContentChars) + "..."
      : content;

  const linkToBlog = `/blog/${id}`;

  const bubbleStyle = "text-xs";
  const interactionIconBaseStyleTailwind = "fill-current size-4";
  const interactionIconUsedStyleTailwind = "fill-red-400 size-4";

  return (
    <article className="grid gap-y-4 relative">
      <header className="pt-8">
        <Title700 as="h2">
          <a href={linkToBlog}>{trimmedTitle}</a>
        </Title700>
        <p className="flex flex-wrap items-center gap-1 text-red-400 mt-4">
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
          <a href={`/profile/${author.id}`} className="hover:underline">
            {author.name}
          </a>
          <span className="text-[hsla(0,0%,0%,0.5)]">
            {createdAt.toString()}
          </span>
        </p>
        <div className="flex items-center w-full absolute top-0 isolate">
          <IconBubble
            title="category"
            className="text-xs absolute right-4 z-1 bg-white"
          >
            <p className="flex items-center gap-1 ">
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
              <a href={`/category/${category}`}>
                <span className="sr-only block">category: </span>
                {category}
              </a>
            </p>
          </IconBubble>
          <span className="block w-full border-t-solid border-t-1 border-t-[hsla(0,0%,0%,0.25)]"></span>
        </div>
      </header>
      <a href={linkToBlog}>
        <img
          src={thumbnailUrl}
          alt=""
          className="aspect-video object-cover object-center rounded-2xl overflow-auto"
        />
      </a>
      <p>{trimedContent}</p>
      <footer>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p>
            <a
              href={linkToBlog}
              className="font-bold underline underline-offset-4 hover:decoration-1 visited:text-[hsla(0,0%,0%,0.5)]"
            >
              Read more...
            </a>
          </p>
          <div className="flex gap-4">
            <IconBubble title="Likes" className={bubbleStyle}>
              <span className="sr-only">likes</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
                aria-hidden="true"
                className={
                  userInteractions.like
                    ? interactionIconUsedStyleTailwind
                    : interactionIconBaseStyleTailwind
                }
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>
              <span>{interactionsCount.like}</span>
            </IconBubble>
            <IconBubble title="comments" className={bubbleStyle}>
              <span className="sr-only">comments</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
                aria-hidden="true"
                className={
                  userInteractions.comment
                    ? interactionIconUsedStyleTailwind
                    : interactionIconBaseStyleTailwind
                }
              >
                <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
              <span>{interactionsCount.comment}</span>
            </IconBubble>
            <IconBubble title="share" className={bubbleStyle}>
              <span className="sr-only">share</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
                aria-hidden="true"
                className={interactionIconBaseStyleTailwind}
              >
                <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
              </svg>
            </IconBubble>
          </div>
        </div>
      </footer>
    </article>
  );
}
