import { getSubscriptions } from "@data/subscriptions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ONE_DAY_IN_MS } from "@/utils/constants";
import Link from "next/link";
import { remove } from "@/actions/subscriptions";
import { auth } from "@/auth";
import { UsersRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | Subscriptions",
};

export default async function Page() {
  const [session, subscriptions] = await Promise.all([
    auth(),
    getSubscriptions(),
  ]);

  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  return (
    <div className="flex flex-col gap-8">
      <Link href={"/dashboard/subscriptions/create"}>
        <Button variant="outline">Create new</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => {
            const { id, title, type, time, price } = subscription;

            return (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{`${Number(Number(time) / ONE_DAY_IN_MS).toFixed(2)} days`}</TableCell>
                <TableCell>{`${price} RON`}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/subscriptions/${id}/edit`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Link href={`/dashboard/subscriptions/${id}`}>
                      <Button variant="outline">Details</Button>
                    </Link>
                    <form action={remove.bind(null, id)}>
                      <Button type="submit" variant="outline">
                        Delete
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
