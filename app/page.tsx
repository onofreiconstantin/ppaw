"use cache";

import { getNews } from "@/data/news";
import { unstable_cacheTag as cacheTag } from "next/cache";

export default async function Home() {
  cacheTag("home");

  const news = await getNews();

  return (
    <div className="flex flex-col gap-8">
      {news.map((item) => {
        const { id, title, content, User } = item;
        const { firstName, lastName } = User;

        return (
          <div key={id} className="flex max-w-xl flex-col gap-2">
            <div className="flex justify-between gap-2">
              <p>{title}</p>
              <p>{`${lastName} ${firstName}`}</p>
            </div>
            <p>{content}</p>
          </div>
        );
      })}
    </div>
  );
}
