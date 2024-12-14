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

export const metadata = {
  title: "Dashboard | News",
};

export default async function Page() {
  const session = await auth();

  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  const news = await getNews();

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
            const { firstName, lastName } = User;

            return (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{content}</TableCell>
                <TableCell>{`${firstName} ${lastName}`}</TableCell>
                <TableCell>
                  <form action={remove.bind(null, id)}>
                    <Button type="submit" variant="outline">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </PageContainer>
  );
}
