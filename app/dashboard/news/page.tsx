import { auth } from "@/auth";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getNews } from "@/data/news";
import { remove } from "@/actions/news";

import { UsersRole } from "@prisma/client";
import { redirect } from "next/navigation";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import Form from "@/components/form/form";
import { Input } from "@/components/ui/input";
import FormButton from "@/components/form-button/form-button";

export const metadata = {
  title: "Dashboard | News",
};

export default async function Page() {
  const [session, news] = await Promise.all([auth(), getNews()]);

  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  return (
    <PageContainer>
      <PageTitle>News</PageTitle>
      <Link href={"/dashboard/news/create"}>
        <Button variant="outline">Add news</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Author</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((item) => {
            const { id, title, content, User } = item;
            const { id: userId, firstName, lastName } = User;

            return (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{content}</TableCell>
                <TableCell>{`${firstName} ${lastName}`}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/news/${id}`}>
                      <Button variant="outline">Details</Button>
                    </Link>
                    {session?.user.id === userId && (
                      <>
                        <Link href={`/dashboard/news/${id}/edit`}>
                          <Button variant="outline">Edit</Button>
                        </Link>
                        <Form action={remove}>
                          <Input name="id" type="hidden" defaultValue={id} />
                          <FormButton variant="outline">Delete</FormButton>
                        </Form>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </PageContainer>
  );
}
