import prisma from "@/lib/db";
import { notFound } from "next/navigation";

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

const getNews = async () => {
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
};

export { getNewsItem, getNews };
