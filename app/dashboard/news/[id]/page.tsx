import { auth } from "@/auth";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import { Button } from "@/components/ui/button";
import { getNewsItem } from "@/data/news";
import { UsersRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsItem(id);
  const { title, content } = news;

  return {
    title: `Dashboard | News | ${title}`,
    description: content,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [session, { id }] = await Promise.all([auth(), params]);
  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  const news = await getNewsItem(id);
  const { title, content } = news;

  return (
    <PageContainer>
      <PageTitle>Subscription details</PageTitle>
      <div className="flex flex-col gap-2">
        <p>{`Title: ${title}`}</p>
        <p>{`Content: ${content}`}</p>
      </div>
      <div className="flex gap-2">
        <Link href={`/dashboard/news/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Link href={`/dashboard/news`}>
          <Button variant="outline">Back to list</Button>
        </Link>
      </div>
    </PageContainer>
  );
}
