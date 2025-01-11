import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { UsersRole } from "@prisma/client";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import Form from "@/components/form/form";
import FormButton from "@/components/form-button/form-button";
import { getNewsItem } from "@/data/news";
import { edit } from "@/actions/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsItem(id);
  const { title, content } = news;

  return {
    title: `Dashboard | News | ${title} | Edit`,
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
      <PageTitle>Edit subscription</PageTitle>
      <Form action={edit} className="flex max-w-md flex-col gap-2">
        <Input name="id" defaultValue={id} type="hidden" />
        <div className="flex items-center gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" defaultValue={title} />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea name="content" defaultValue={content} />
        </div>

        <FormButton variant="outline">Edit</FormButton>
      </Form>

      <Link href={`/dashboard/news`}>
        <Button variant="outline">Back to list</Button>
      </Link>
    </PageContainer>
  );
}
