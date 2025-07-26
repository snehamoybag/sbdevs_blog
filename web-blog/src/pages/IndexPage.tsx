import { useState, type ReactElement } from "react";
import Main from "../components/Main";
import BlogPost from "../components/BlogPost";
import type { Blog } from "../types/Blog";
import rawData from "../utils/data";

interface IndexPageProps {}

export default function IndexPage({}: Readonly<IndexPageProps>): ReactElement {
  const [data, setData] = useState<Blog[]>(rawData);

  return (
    <Main className="grid gap-y-16">
      {data.map((item) => (
        <BlogPost
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          thumbnailUrl={item.imageUrls[0]}
          createdAt={item.date.createdAt}
          category={item.category}
          author={item.author}
          interactionsCount={item.interactionsCount}
          userInteractions={item.userInteractions}
        />
      ))}
    </Main>
  );
}
