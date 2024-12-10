import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { unstable_cache as cache } from "next/cache";

const getNewsItem = async (id: string) => {
  try {
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
      },
    });

    if (!news) notFound();

    return news;
  } catch (error) {
    throw error;
  }
};

const getNews = cache(
  async () => {
    try {
      const news = await prisma.news.findMany({
        where: {
          isDeleted: false,
        },
        include: {
          User: true,
        },
      });

      return news;
    } catch (error) {
      throw error;
    }
  },
  [],
  { tags: ["news"] },
);

export { getNewsItem, getNews };
