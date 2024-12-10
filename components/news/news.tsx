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

export default async function News() {
  const news = await getNews();

  return (
    <div className="flex flex-col gap-8">
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
    </div>
  );
}
